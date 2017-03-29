/**
 * Created by Dario on 21.03.17.
 *
 * Creates a ShareDB server (persistent with Mongo by default)
 */
import { Meteor } from 'meteor/meteor';
import http from 'http';
import ShareDB from 'sharedb';
import WebSocket from 'ws';
import WebsocketJSONStream from 'websocket-json-stream';

// We define default options in case the user hasn't define them himself.
const options = _.extend({
  port: 8080,
  db: {
    type: 'mongo',
    port: 3001,
    database: 'meteor',
  }
}, typeof(ref = Meteor.settings.collabmeteor) !== "undefined" ? ref.options : void 0);

let db = {};
switch (options.db.type) {
  case 'mongo':
    db = require('sharedb-mongo')('mongodb://localhost:' + options.db.port + '/' + options.db.database);
    break;
  case 'in-memory':
    break;
  default:
    Meteor._debug('ShareDBModel: Invalid Database type, using non-persistent instance (in memory)');
}

const server = http.createServer();
const backend = new ShareDB({db});

export default class CollabMeteor {
  /**
   * @param {string} collectionName The collection name
   */
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.connection = new ShareDB({db}).connect();
    this.OpsCollection = new Mongo.Collection("o_" + collectionName);
  }

  static startServer() {
    new WebSocket.Server({server: server})
      .on('connection', function (ws) {
        backend.listen(new WebsocketJSONStream(ws));
        console.log('New socket client on CollabMeteor instance');
      });

    server.listen(options.port, function(err) {
      if (err) throw err;
      console.log('CollabMeteor: Server Listening on port ' + options.port);
    });
  }

  static stopSever() {
    if (backend === null) {
      Meteor._debug('CollabMeteor: No CollabMeteor instance to close');
      return;
    }
    backend.close();
    console.log('CollabMeteor: Server closed');
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
   */
  fetch(id) {
    const doc = this.connection.get(this.collectionName, id);
    doc.fetch((err) => {
      if (err) throw err;
    });
    return doc;
  }

  /**
   * Removes a document with id id.
   *
   * @param id
   */
  remove(id) {
    this.OpsCollection.remove({'d': id});
  }
}