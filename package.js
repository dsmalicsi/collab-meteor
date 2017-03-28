Package.describe({
  name: 'danongba:meteor-sharedb',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Smooth and quick integration of a ShareDB real-time collaborative editor with React',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/darioAnongba/meteor-sharedb',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "sharedb": "^1.0.0-beta.7",
  "sharedb-mongo": "^1.0.0-beta.3",
  "sharedb-string-binding": "^1.0.0",
  "websocket-json-stream": "0.0.3",
  "ws": "^2.2.0"
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.3.1');
  api.use('ecmascript');
  api.use('underscore', 'server');
  api.mainModule('sharedb-client.js', 'client');
  api.mainModule('collab-meteor-server.js', 'server')
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('danongba:meteor-sharedb');
  api.mainModule('meteor-sharedb-tests.js');
});
