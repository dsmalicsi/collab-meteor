/**
 * Created by dario on 04.05.17.
 */
import React, { Component } from 'react';

import { CollabForm } from 'meteor/danongba:collab-meteor';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    this.schema = {
      title: "My Collaborative form",
      type: "object",
      required: ["input", "textarea"],
      properties: {
        input: {type: "string", title: "Input"},
        textarea: {type: "string", title: "Textarea", default: 'Default text'},
      }
    };

    this.uiSchema = {
      input: {"ui:help": "Help text"},
      textarea: {"ui:widget": "textarea", "ui:options": {rows: 8} },
    };
  }

  static onChange({formData}) {
    console.log('OnChange: ' + formData);
  }

  static onSubmit({formData}) {
    console.log('onSubmit: ' + formData);
  }

  static onError(errors) {
    console.log('onError: ' + errors);
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Collaborative Form</h1>
        </header>

        <hr/>

        <CollabForm
          id="myForm"
          collectionName="forms"
          schema={this.schema}
          uiSchema={this.uiSchema}
          onChange={App.onChange}
          onSubmit={App.onSubmit}
          onError={App.onError}
        />
      </div>
    );
  }
}