import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'react': '15.4.2',
  'react-dom': '15.4.2',
  "react-router": "3.0.2",
  "sharedb": "^1.0.0-beta.7",
  "sharedb-string-binding": "^1.0.0"
}, 'danongba:meteor-sharedb');