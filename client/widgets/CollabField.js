/**
 * Created by dario on 04.04.17.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import StringBinding from 'sharedb-string-binding';

export default class CollabField extends Component {
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
}