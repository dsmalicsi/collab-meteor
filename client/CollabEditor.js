/**
 * Created by dario on 11.04.17.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StringBinding from 'sharedb-string-binding';
import connection from './connection';

export class CollabEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null
    }
  }

  componentWillMount() {
    const comp = this;
    const doc = connection.get('docs', this.props.id);
    doc.subscribe((err) => {
      if (err) console.log(err);
      if(doc.type === null) {
        doc.create('', function (err) {
          if (err) throw err;
        })
      }
    });
    this.setState({doc: doc});

    doc.on('create', update);
    doc.on('load', update);
    doc.on('del', del);

    function update() {
      comp.setState({doc: doc});
    }

    function del() {
      comp.state.doc.destroy();
      comp.setState({doc: null});

      comp.cleanTextare();
    }
  }

  componentDidMount() {
    this.fillTextarea();
  }

  fillTextarea() {
    const textArea = ReactDOM.findDOMNode(this._textarea);
    this.state.doc.subscribe((err) => {
      if (err) throw err;
      const binding = new StringBinding(textArea, this.state.doc);
      binding.setup();
    });
  }

  cleanTextare() {
    const textArea = ReactDOM.findDOMNode(this._textarea);
    textArea.value = '';
  }

  componentWillUnmount(){
    this.state.doc.destroy();
  }

  render() {
    return (
      <textarea ref={(ref) => this._textarea = ref} className="form-control" rows="10"/>
    );
  }
}