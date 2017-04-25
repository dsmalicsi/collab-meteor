/**
 * Created by dario on 04.04.17.
 */
import React, { Component } from 'react';
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
    // We check if the id already exists in the document, if not, we create it with the formData value.
    if(!_.has(this.state.form.data, this.props.id)) {
      const comp = this;
      const value = typeof(this.props.value) !== "undefined" ? this.props.value : '';
      this.state.form.submitOp([{p: [this.props.id], oi: value}], function (err) {
        if (err) console.log(err);
        comp.createBinding(this.props);
      });
    } else {
      this.createBinding(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('New props !');
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