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

    _.extend(this.props.widgets, {
      collabTextInput: CollabTextInput,
      collabTextarea: CollabTextarea
    });
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
    return (
      this.state.form &&
      <Form
        {...this.props}
        formContext={this.state.form}
      />
    )
  }
}

if (process.env.NODE_ENV !== "production") {
  CollabForm.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.any,
    widgets: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    ),
    fields: PropTypes.objectOf(PropTypes.func),
    ArrayFieldTemplate: PropTypes.func,
    FieldTemplate: PropTypes.func,
    ErrorList: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    showErrorList: PropTypes.bool,
    onSubmit: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    action: PropTypes.string,
    autocomplete: PropTypes.string,
    enctype: PropTypes.string,
    acceptcharset: PropTypes.string,
    noValidate: PropTypes.bool,
    noHtml5Validate: PropTypes.bool,
    liveValidate: PropTypes.bool,
    validate: PropTypes.func,
    transformErrors: PropTypes.func,
    safeRenderCompletion: PropTypes.bool,
  };
}

CollabForm.defaultProps = {
  uiSchema: {},
  widgets: {},
  noValidate: false,
  liveValidate: false,
  safeRenderCompletion: false,
  noHtml5Validate: false,
};