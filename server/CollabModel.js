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