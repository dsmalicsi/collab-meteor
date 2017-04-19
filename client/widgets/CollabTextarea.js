/**
 * Created by dario on 04.04.17.
 */
import React, { PropTypes } from 'react';
import CollabField from "./CollabField";

class CollabTextarea extends CollabField {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      options,
      placeholder,
      value,
      required,
      disabled,
      readonly,
      autofocus,
      onChange,
      onBlur,
    } = this.props;

    const _onChange = ({ target: { value } }) => {
      return onChange(value === "" ? options.emptyValue : value);
    };

    return (
      <textarea
        id={id}
        className="form-control"
        value={typeof value === "undefined" ? "" : value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        autoFocus={autofocus}
        rows={options.rows}
        onBlur={onBlur && (event => onBlur(id, event.target.value))}
        onChange={_onChange}
        ref={(ref) => this._widget = ref}
      />
    )
  }
}

CollabTextarea.defaultProps = {
  autofocus: false,
  options: {},
};

if (process.env.NODE_ENV !== "production") {
  CollabTextarea.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.shape({
      rows: PropTypes.number,
    }),
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };
}

export default CollabTextarea;