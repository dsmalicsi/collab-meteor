/**
 * Created by dario on 04.04.17.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StringBinding from 'sharedb-string-binding';

export default class CollabTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: props.formContext
    };
  }

  componentDidMount() {
    this.createBinding(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props, nextProps)) {
      console.log('willReceiveProps');
      this.destroyBinding();
    }
  }

  componentWillUnmount(){
    this.destroyBinding();
  }

  createBinding() {
    const widget = ReactDOM.findDOMNode(this._widget);
    this.binding = new StringBinding(widget, this.state.form, [this.props.id]);
    this.binding.setup();
  }

  destroyBinding() {
    this.state.form.unsubscribe();
    this.state.form.destroy();
    this.binding.destroy();
  }

  render() {
    const {id, value, required, readonly} = this.props;
    return (
      <input
        ref={(ref) => this._widget = ref}
        id={id}
        className="form-control"
        value={value}
        required={required}
        readOnly={readonly}
      />
    );
  }
}