Package.describe({
  name: 'danongba:collab-meteor',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Smooth and quick integration of a real-time collaborative form with React',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/darioAnongba/collab-meteor',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "sharedb": "1.0.0-beta.7",
  "sharedb-mongo": "1.0.0-beta.3",
  "websocket-json-stream": "0.0.3",
  "ws": "2.2.0",
  "sharedb-string-binding": "1.0.0",
  "react-jsonschema-form": "0.45.0"
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.4.1');
  api.use('ecmascript');
  api.use('underscore', 'server');
  api.mainModule('collab-meteor-client.js', 'client');
  api.mainModule('collab-meteor-server.js', 'server')
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('danongba:collab-meteor');
  api.use('tmeasday:check-npm-versions');
  api.mainModule('collab-meteor-tests.js');
});
