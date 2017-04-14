/**
 * Created by dario on 11.04.17.
 */
import React, { Component, PropTypes } from 'react';
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
 * - classname: Optional classname to apply to the textarea
 */
export class CollabEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null
    };
  }

  componentWillMount() {
    this.subscribeToDoc(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props, nextProps)) {
      this.state.doc.unsubscribe();
      this.state.doc.destroy();
      this.binding.destroy();

      this.subscribeToDoc(nextProps);
    }
  }

  subscribeToDoc(props) {
    const comp = this;
    const doc = connection.get('collab_data_' + props.collectionName, props.id);
    doc.subscribe((err) => {
      if (err) console.log(err);
      if(doc.type === null) {
        console.log('No document exist with id: ' + props.id);
      }
    });

    doc.on('load', load);
    doc.on('del', del);

    function load() {
      comp.setState({doc: doc}, comp.fillEditor);
    }

    function del() {
      comp.state.doc.unsubscribe();
      comp.state.doc.destroy();
      comp.binding.destroy();
    }
  }

  fillEditor() {
    const textArea = ReactDOM.findDOMNode(this._textarea);
    this.binding = new StringBinding(textArea, this.state.doc);
    this.binding.setup();
  }

  componentWillUnmount(){
    this.state.doc.unsubscribe();
    this.state.doc.destroy();
    this.binding.destroy();
  }

  render() {
    return (
      <textarea ref={(ref) => this._textarea = ref} className={this.props.className} rows="10"/>
    );
  }
}

CollabEditor.PropTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};