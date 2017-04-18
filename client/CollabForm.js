/**
 * Created by dario on 13.04.17.
 */

import React, { Component, PropTypes } from 'react';
import Form from "react-jsonschema-form";
import connection from './connection';
import CollabTextarea from './widgets/CollabTextarea';
import CollabTextInput from './widgets/CollabTextInput';

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

    this.customWidgets = {
      collabTextInput: CollabTextInput,
      collabTextarea: CollabTextarea
    };
  };

  componentWillMount() {
    this.subscribeToForm(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props, nextProps)) {
      console.log('WillReceiveProps');
    }
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
      console.log('deleting');
    }
  }

  render() {
    const { schema, uiSchema, classNames } = this.props;
    return (
      this.state.form &&
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData= {this.state.form.data}
        widgets={this.customWidgets}
        formContext={this.state.form}
        className={classNames}
      />
    )
  }
}

CollabForm.PropTypes = {
  schema: PropTypes.object.isRequired,
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  uiSchema: PropTypes.object,
  classNames: PropTypes.string
};