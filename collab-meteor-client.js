import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'react': '15.4.2',
  'react-dom': '15.4.2',
  'react-router': '3.0.2',
  'react-jsonschema-form': '0.45.0'
}, 'danongba:collab-meteor');

export { CollabEditor } from './client/CollabEditor.js';
export { CollabForm } from './client/CollabForm.js';