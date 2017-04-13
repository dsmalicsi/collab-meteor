// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by collab-meteor.js.
import { name as packageName } from "meteor/danongba:collab-meteor";

// Write your tests here!
// Here is an example.
Tinytest.add('collab-meteor - example', function (test) {
  test.equal(packageName, "collab-meteor");
});
