import React, { useContext } from "react";
import AppContext from "contexts/AppContext";
import { Link } from "react-router-dom";
import Chart from "components/Order/Chart";

const GridItem = props => {
  const { updateState } = useContext(AppContext);
  const { data } = props;
  const { symbol, current_price, purchase_count, owner, profile_picture } = data;
  return (
    <Link to={`/token/${symbol}`}>
      <div
        className="grid-card"
        onClick={() => {
          updateState("currentCampaign", data);
        }}
      >
        <div className="value text-white">
          ${parseFloat(current_price).toFixed(2)}
        </div>
        <div className="hour-text text-grey">/hour</div>
        <div className="banner-container">
          <img
            src={profile_picture}
            className={`banner-image`}
            alt=""
          />
        </div>
        <div className="name text-white">{owner.name}</div>
        <div className="job text-grey">{owner.short_description}</div>
        <div className="bottom-container">
          <div className="bottom-item">
            <div className="item-header text-grey">Token Symbol</div>
            <div className="item-value text-white">{symbol}</div>
          </div>
          <div className="bottom-item">
            <div className="item-header text-grey">Hours sold</div>
            <div className="item-value text-white">{purchase_count}</div>
          </div>
        </div>
        <div className="hover-layer">
          <div className="text-white">{purchase_count}</div>
        </div>
      </div>
    </Link>
  );
};

GridItem.propTypes = {};

GridItem.defaultProps = {};

export default GridItem;
