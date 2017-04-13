/**
 * Created by dario on 06.04.17.
 */
import { Meteor } from 'meteor/meteor';
import { CollabMeteor } from './CollabMeteor';

export class CollabModel {
  /**
   * @param {Object} collection The collection to bind to ShareDB
   */
  constructor(collection) {
    const backend = CollabMeteor.backend;
    if (backend === null) {
      throw new Meteor.Error('CollabModel: You should start the CollabMeteor server before using the model.');
    }

    this.connection = backend.connect();
    this.collectionName = 'collab_data_' + collection._name;
    this.OpsCollection = new Mongo.Collection('o_' + this.collectionName);
  }

  /**
   * Creates a new document or fetch a document if it already exists.
   *
   * @param {String} id The document id
   * @param {Object} data The document initial data
   */
  create(id, data = {}) {
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
   * Fetches the data of a document with id id.
   *
   * @param {String} id The id of the document to fetch
   */
  fetchData(id) {
    const doc = this.connection.get(this.collectionName, id);
    doc.fetch((err) => {
      if (err) throw err;
      doc.del();
    });
  }

  /**
   * Deletes a document with id id.
   *
   * @param id
   */
  remove(id) {
    const doc = this.connection.get(this.collectionName, id);
    doc.fetch((err) => {
      if (err) throw err;
      doc.del();
    });

    this.OpsCollection.remove({'d': id});
  }
}