/**
 * Created by dario on 06.04.17.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import http from 'http';
import ShareDB from 'sharedb';
import WebSocket from 'ws';
import WebsocketJSONStream from 'websocket-json-stream';
import options from './options';

export const CollabMeteor = ShareDB || {};

let db = require('sharedb-mongo')('mongodb://localhost:' + options.db.port + '/' + options.db.database);

const server = http.createServer();
const backend = new ShareDB({db});

CollabMeteor.backend = backend;
CollabMeteor.OpsCollection = new Mongo.Collection('o_docs');

CollabMeteor.startServer = () => {
  new WebSocket.Server({server: server})
    .on('connection', function (ws) {
      backend.listen(new WebsocketJSONStream(ws));
      console.log('New socket client on CollabMeteor instance');
    });

  server.listen(options.port, function(err) {
    if (err) throw err;
    console.log('CollabMeteor: Server Listening on port ' + options.port);
  });
};

CollabMeteor.stopSever = () => {
  if (backend === null) {
    Meteor._debug('CollabMeteor: No CollabMeteor instance to close');
    return;
  }
  backend.close();
  console.log('CollabMeteor: Server closed');
};