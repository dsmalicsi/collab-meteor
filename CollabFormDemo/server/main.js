import { Meteor } from 'meteor/meteor';
import { CollabMeteor, CollabModel } from 'meteor/danongba:collab-meteor';

// Create the collection that will hold the shared data.
const formModel = new CollabModel("forms");

// Define the schema of the data
const schema = {
  title: "My Collaborative form",
  type: "object",
  properties: {
    input: {type: "string", title: "Input"},
    textarea: {type: "string", title: "Textarea", default: 'Default text'},
  }
};

// Create the form data
formModel.createForm("myForm", schema);

Meteor.startup(() => {
  // start CollabMeteor server
  CollabMeteor.startServer();
});
