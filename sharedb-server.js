/**
 * Created by Dario on 21.03.17.
 *
 * Creates a ShareDB server (persistent with Mongo by default)
 */
import { Meteor } from 'meteor/meteor';
import http from 'http';
import Share from 'sharedb';
import WebSocket from 'ws';
import WebsocketJSONStream from 'websocket-json-stream';

export const ShareDB = Share || {};

// We define default options in case the user hasn't define them himself.
const options = _.extend({
  port: 8080,
  db: {
    type: 'mongo',
    port: 3001,
    database: 'meteor',
  }
}, typeof(ref = Meteor.settings.sharedb) !== "undefined" ? ref.options : void 0);

ShareDB.startServer = function () {
  const server = http.createServer();
  const db = require('sharedb-mongo')('mongodb://localhost:' + options.db.port + '/' + options.db.database);
  const backend = new ShareDB({db});

  new WebSocket.Server({server: server})
    .on('connection', function (ws) {
      backend.listen(new WebsocketJSONStream(ws));
      console.log('New socket client on ShareDB instance');
    });

  try {
    server.listen(options.port);
    console.log('ShareDB server Listening on port https://localhost:' + options.port);
  } catch (e) {
    console.error(e);
  }
};