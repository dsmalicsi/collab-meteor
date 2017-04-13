/**
 * Created by dario on 11.04.17.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StringBinding from 'sharedb-string-binding';
import connection from './connection';

/**
 * Collaborative Editor class.
 *
 * Creates a new collaborative editor fetching data from the shareDB collection and displaying it in a <textarea/>
 * The editor takes as props:
 * - id: ID of the document to fetch
 * - collectionName: The name of the collection
 * - classname: The classname to apply to the textarea
 */
export class CollabEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null
    };

    this.collectionName = 'collab_data_' + props.collectionName;
  }

  componentWillMount() {
    const comp = this;
    const doc = connection.get(this.collectionName, this.props.id);
    doc.fetch((err) => {
      if (err) console.log(err);
      if(doc.type === null) {
        console.log('No document exist with this id');
      }
    });
    this.setState({doc: doc});

    doc.on('load', load);
    doc.on('del', del);
    
    function load() {
      comp.setState({doc: doc}, comp.fillTextarea);
    }

    function del() {
      comp.state.doc.destroy();
      comp.setState({doc: null});

      comp.cleanTextarea();
    }
  }

  fillTextarea() {
    const textArea = ReactDOM.findDOMNode(this._textarea);
    const binding = new StringBinding(textArea, this.state.doc);
    binding.setup();
  }

  cleanTextarea() {
    const textArea = ReactDOM.findDOMNode(this._textarea);
    textArea.value = '';
  }

  componentWillUnmount(){
    this.state.doc.destroy();
  }

  render() {
    return (
      <textarea ref={(ref) => this._textarea = ref} className={this.props.className} rows="10"/>
    );
  }
}