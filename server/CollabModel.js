/**
 * Created by dario on 06.04.17.
 */
import { Meteor } from 'meteor/meteor';
import { CollabMeteor } from './CollabMeteor';

export class CollabModel {
  /**
   * @param {Object} collectionName The name of the collection to bind to ShareDB
   */
  constructor(collectionName) {
    const backend = CollabMeteor.backend;
    if (backend === null) {
      throw new Meteor.Error('CollabModel: You should start the CollabMeteor server before using the model.');
    }

    this.connection = backend.connect();
    this.collectionName = 'collab_data_' + collectionName;
    this.OpsCollection = new Mongo.Collection('o_' + this.collectionName);
  }

  /**
   * Creates a new document or fetch a document if it already exists.
   *
   * @param {String} id The document id
   * @param {String} data The document initial data string.
   */
  create(id, data = "") {
    const doc = this.connection.get(this.collectionName, id);
    doc.fetch((err) => {
      if (err) throw err;
      if (doc.type === null) {
        doc.create(data, function (err) {
          if(err) throw err;
        });
      }
    });
    return doc;
  }

  /**
   * Creates a new form given a schema or fetch a form if it already exists.
   *
   * @param {String} id The form id
   * @param {Object} schema The form schema used to generate the data object
   */
  createForm(id, schema={}) {
    const doc = this.connection.get(this.collectionName, id);
    doc.fetch((err) => {
      if (err) throw err;
      // If the document doesn't already exist, we create it following the schema.
      if (doc.type === null) {
        let data = {};
        _.each(schema.properties, function (value, key) {
          let prop = {};
          // If it is a String, we create an empty string if the default value is empty.
          if(value.type === "string") {
            prop[key] = typeof(value.default) === "undefined" ? "" : value.default ;
          }
          else {
            prop[key] = typeof(value.default) === "undefined" ? null : value.default ;
          }
          _.extend(data, prop);
        });

        doc.create(data, function (err) {
          if(err) throw err;
          return doc;
        });
      }
    });
    return doc;
  }

  /**
   * Deletes a document with ID id.
   *
   * @param id
   */
  remove(id) {
    const doc = this.connection.get(this.collectionName, id);
    doc.subscribe((err) => {
      if (err) throw err;
      doc.del();
    });

    this.OpsCollection.remove({'d': id});
  }
}