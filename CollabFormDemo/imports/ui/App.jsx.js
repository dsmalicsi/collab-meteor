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
      title: 'My Collaborative form',
      type: 'object',
      properties: {
        collab: {
          type: 'boolean',
          title: 'Collaborative?'
        },
        justify: {
          type: 'boolean',
          title: 'Students must justify their answers'
        },
        MCQ: {
          title: 'MCQ',
          type: 'array',
          items: {
            type: 'object',
            title: 'New Question',
            properties: {
              question: {
                type: 'string',
                title: 'Question'
              },
              answers: {
                type: 'array',
                title: 'Possible answers',
                items: {
                  type: 'object',
                  properties: {
                    answer: {
                      type: 'string',
                      title: 'Answer'
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    this.uiSchema = {
      input: { 'ui:help': 'Help text' },
      textarea: { 'ui:widget': 'textarea', 'ui:options': { rows: 8 } }
    };
  }

  static onChange({ formData }) {
    console.log('onChange: ' + formData);
  }

  static onSubmit({ formData }) {
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
