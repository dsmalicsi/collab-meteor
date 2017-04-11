/**
 * Created by dario on 06.04.17.
 */
import { CollabMeteor } from './CollabMeteor';

export class CollabModel {
  /**
   * @param {Object} collection The collection to bind to ShareDB
   */
  constructor(collection) {
    const backend = CollabMeteor.backend;
    this.connection = backend.connect();
    this.collection = collection;
    this.OpsCollection = CollabMeteor.OpsCollection;
  }

  /**
   * Creates a new document or fetch a document if it already exists.
   *
   * @param {String} id The document id
   * @param {Object} data The document initial data
   */
  create(id, data = '') {
    const doc = this.connection.get(this.collection._name, id);
    doc.fetch((err) => {
      if (err) throw err;
      if (doc.type === null) {
        console.log('I\'m here 2!');
        doc.create(data, function (err) {
          if(err) throw err;
        });
      }
    });
    return doc;
  }

  /**
   * Fetches a document with id id.
   *
   * @param {String} id The id of the document to fetch
   */
  fetch(id) {
    const doc = this.connection.get(this.collection._name, id);
    doc.fetch((err) => {
      if (err) throw err;
      return doc;
    });
  }

  /**
   * Removes a document with id id.
   *
   * @param id
   */
  remove(id) {
    const doc = this.connection.get('docs', id);
    doc.fetch((err) => {
      if (err) throw err;
      doc.del();
    });

    this.OpsCollection.remove({'d': id});
  }
}