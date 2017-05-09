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
    checkbox: {type: "boolean", title: "Checkbox"},
    textarea: {type: "string", title: "Textarea", default: 'Default text'},
    email: {type: "string", title: "Email"},
  }
};

// Create the shared form data
formModel.createForm("myForm", schema);

Meteor.startup(() => {
  // start the CollabMeteor server
  CollabMeteor.startServer();
});
