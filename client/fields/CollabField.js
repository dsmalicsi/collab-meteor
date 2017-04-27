/**
 * Created by dario on 04.04.17.
 */
import React, { Component, PropTypes } from 'react';
import StringBinding from 'sharedb-string-binding';

class CollabField extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.createBinding();
  }

  componentWillUnmount(){
    this.destroyBinding();
  }

  createBinding() {
    this.binding = new StringBinding(this._widget, this.props.formContext, [this.props.name]);
    this.binding.setup();
  }

  destroyBinding() {
    this.state.form.unsubscribe();
    this.state.form.destroy();
    this.binding.destroy();
  }
}

if (process.env.NODE_ENV !== "production") {
  CollabField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object.isRequired,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    formData: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    formContext: PropTypes.object.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
  };
}

CollabField.defaultProps = {
  uiSchema: {},
  disabled: false,
  readonly: false,
  autofocus: false,
};

export default CollabField;