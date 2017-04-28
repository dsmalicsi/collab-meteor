/**
 * Created by dario on 13.04.17.
 */

import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import connection from './connection';
import CollabStringField from './fields/CollabStringField';

/**
 * Collaborative Form class.
 *
 * Creates a new collaborative form given a schema.
 * It fetches and maintains data from the corresponding ShareDB collection and displays a react-jsonschema-form.
 * The form takes as props:
 * - id: ID of the document to fetch
 * - collectionName: The name of the collection
 * - classNames: Optional classnames to apply to the form
 */
export class CollabForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null
    };

    _.extend(this.props.fields, {
      StringField: CollabStringField,
    });
  };

  componentWillMount() {
    this.subscribeToForm(this.props);
  }

  subscribeToForm(props) {
    const comp = this;
    const form = connection.get('collab_data_' + props.collectionName, props.id);
    form.subscribe((err) => {
      if (err) console.log(err);
      if(form.type === null) {
        console.log('No form data exist with id: ' + props.id);
      }
    });

    form.on('load', load);
    form.on('del', del);

    function load() {
      // Form data available only when we are done loading the form
      comp.setState({form: form});
    }

    function del() {
      comp.state.form.destroy();
      comp.state.form.unsubscribe();
      comp.setState({form: null});
    }
  }

  _onChange(x){
    console.log(x.formData);
    this.props.onChange(x);
  }

  render() {
    return (
      this.state.form &&
      <Form
        {...this.props}
        onChange={this._onChange.bind(this)}
        formContext={this.state.form}
        formData={this.state.form.data}
      />
    )
  }
}

CollabForm.defaultProps = {
  uiSchema: {},
  widgets: {},
  fields: {},
  noValidate: false,
  liveValidate: false,
  safeRenderCompletion: false,
  noHtml5Validate: false,
};