/**
 * Created by dario on 04.04.17.
 */
import React  from 'react';
import CollabField from "./CollabField";
import { getUiOptions } from "react-jsonschema-form/lib/utils";

class CollabTextarea extends CollabField {
  constructor(props) {
    super(props);
  }

  _onChange({target: {value}}) {
    return this.props.onChange(value === "" ? this.props.schema.default : value);
  };

  render() {
    const {
      schema,
      uiSchema,
      idSchema,
      formData,
      required,
      disabled,
      readonly,
      autofocus,
      onBlur,
    } = this.props;

    const id = idSchema.$id;
    const { title, description } = schema;
    const { placeholder = "", ...options } = getUiOptions(uiSchema);

    const label = title === undefined ? name : title;

    return (
      <div className={uiSchema.classNames}>
        {
          !options.label &&
          <label
            className="control-label"
            htmlFor={id}>(Collaborative) {label}{required ? "*" : null}
          </label>
        }

        { !options.label && description ? description : null }

        <textarea
          id={idSchema.$id}
          className="form-control"
          value={typeof(formData) === "undefined" ? "" : formData}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          autoFocus={autofocus}
          rows={options.rows}
          onBlur={onBlur && (event => onBlur(id, event.target.value))}
          onChange={this._onChange.bind(this)}
          ref={(widget) => this._widget = widget}
        />
      </div>
    )
  }
}

CollabTextarea.defaultProps = {
  required: false,
};

export default CollabTextarea;