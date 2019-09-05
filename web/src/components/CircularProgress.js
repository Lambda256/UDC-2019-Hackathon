import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

const CircularProgress = props => {
  return (
    <div className="circular-loading">
      <Icon type="loading" spin="true" style={{ fontSize: props.size || 40 }} />
    </div>
  );
};

CircularProgress.propTypes = {
  size: PropTypes.number,
  fullPage: PropTypes.bool
};

CircularProgress.defaultProps = {
  fullPage: true
};

export default CircularProgress;
