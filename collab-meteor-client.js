import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'react': '15.4.2',
  'react-dom': '15.4.2',
  "react-router": "3.0.2"
}, 'danongba:meteor-sharedb');

export { CollabTextarea } from './CollabTextarea.js';