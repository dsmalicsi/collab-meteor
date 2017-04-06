import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'react': '^15.4.x',
  'react-dom': '^15.4.x'
}, 'my:awesome-package');