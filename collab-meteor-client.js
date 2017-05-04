import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'react': '15.5.x',
  'react-dom': '15.5.x',
  'react-jsonschema-form': '0.48.x'
}, 'danongba:collab-meteor');

export { CollabEditor } from './client/CollabEditor.js';
export { CollabForm } from './client/CollabForm.js';