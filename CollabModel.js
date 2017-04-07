/**
 * Created by dario on 06.04.17.
 */
import ShareDB from 'sharedb';
import { CollabMeteor } from './CollabMeteor';

export class CollabModel {
  /**
   * @param {string} collectionName The collection name
   */
  constructor(collectionName) {
    const db = CollabMeteor.db;
    this.collectionName = collectionName;
    this.connection = new ShareDB({db}).connect();

    this.collection = new Mongo.Collection(collectionName);
    this.OpsCollection = new Mongo.Collection("o_" + collectionName);
  }

  /**
   * Creates a new document or fetch a document if it already exists.
   *
   * @param {String} id The document id
   * @param {Object} data The document initial data
   */
  create(id, data = '') {
    const doc = this.connection.get(this.collectionName, id);
    doc.fetch((err) => {
      if (err) throw err;
      if (doc.type === null) {
        doc.create(data);
      }
    });
    return doc;
  }

  /**
   * Fetches a document with id id.
   *
   * @param {String} id The id of the document to fetch
   * @param callback The callback function
   */
  fetch(id, callback = () => {}) {
    const doc = this.connection.get(this.collectionName, id);
    doc.fetch(callback);
    return doc;
  }

  /**
   * Removes a document with id id.
   *
   * @param id
   */
  remove(id) {
    //this.collection.remove(id);
    //this.OpsCollection.remove({'d': id});
  }
}