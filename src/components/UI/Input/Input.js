import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const { label, type } = props;
  return (
    <div className={classes.input}>
      <label htmlFor={type}>{label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
Input.prototype = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default Input;
