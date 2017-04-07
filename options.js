/**
 * Created by dario on 06.04.17.
 */

// We define default options in case the user hasn't define them himself.
export default options = _.extend({
  port: 8080,
  db: {
    type: 'mongo',
    port: 3001,
    database: 'meteor',
  }
}, typeof(ref = Meteor.settings.collabmeteor) !== "undefined" ? ref.options : void 0);
