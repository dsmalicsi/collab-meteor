/**
 * Created by dario on 04.04.17.
 */
import React, { PropTypes } from 'react';
import CollabField from "./CollabField";

class CollabTextInput extends CollabField {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      value,
      readonly,
      disabled,
      autofocus,
      onBlur,
      options,
      schema,
      formContext,
      registry,
      ...inputProps
    } = this.props;

    const _onChange = ({ target: { value } }) => {
      return this.props.onChange(value === "" ? options.emptyValue : value);
    };

    return (
      <input
        {...inputProps}
        className="form-control"
        readOnly={readonly}
        disabled={disabled}
        autoFocus={autofocus}
        value={value == null ? "" : value}
        onChange={_onChange}
        onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
        ref={(ref) => this._widget = ref}
      />
    )
  }
}

CollabTextInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CollabTextInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };
}

export default CollabTextInput;