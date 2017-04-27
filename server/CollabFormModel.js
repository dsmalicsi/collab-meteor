/**
 * Created by dario on 06.04.17.
 */
import { CollabModel } from './CollabModel';

export class CollabFormModel extends CollabModel {
  /**
   * @param {Object} collection. The collection to bind to ShareDB
   */
  constructor(collection) {
    super(collection);
  }

  /**
   * Creates a new form given a schema or fetch a form if it already exists.
   *
   * @param {String} id The form id
   * @param {Object} schema The form schema used to generate the data object
   */
  create(id, schema={}) {
    const doc = this.connection.get(this.collectionName, id);
    doc.fetch((err) => {
      if (err) throw err;
      // If the document doesn't already exist, we create it following the schema.
      if (doc.type === null) {
        let data = {};
        _.each(schema.properties, function (value, key) {
          let prop = {};
          prop[key] = typeof(value.default) === "undefined" ? "" : value.default ;
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
}