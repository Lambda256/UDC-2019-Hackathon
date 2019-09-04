import React from "react";
import PropTypes from "prop-types";

const History = props => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="text-white uppercase time-transaction">
          Time transactions
        </div>

        <div className="content">
          <div className="text-white uppercase">Anayltics</div>
          <div className="text-white uppercase value-title">
            232,200<span> USD</span>
          </div>
          <div className="text-white value-subtitle">donated</div>
          <div className="text-white uppercase value-title">
            213<span> TIME</span>
          </div>
          <div className="text-white value-subtitle">purchased</div>
          <div className="text-white uppercase value-title">
            10<span></span>
          </div>
          <div className="text-white value-subtitle">charities</div>
          <div className="text-white uppercase filter-text">
            Filter by Charities
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
