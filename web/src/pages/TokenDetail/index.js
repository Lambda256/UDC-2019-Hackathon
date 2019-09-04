import React, { useContext, useEffect } from "react";
import AppContext from "contexts/AppContext";
import HomeContext from "contexts/HomeContext";
import { scrollTop } from "utils/scroller";
import TokenInfo from "./TokenInfo";
import Trade from "./Trade";
import HourInfo from "./HourInfo";
import CircularProgress from "components/CircularProgress";
import _ from "lodash";

const TokenDetail = props => {
  const {
    match: {
      params: { symbol }
    }
  } = props;
  const { updateState, setTimeSold, currentCampaign, timeSold } = useContext(
    AppContext
  );

  const { getTokens } = useContext(HomeContext);

  useEffect(() => {
    if (currentCampaign) {
      scrollTop();
      updateState("timeSold", currentCampaign.purchase_count);
      setTimeSold(currentCampaign.purchase_count);
    } else {
      getTokens(tokens =>
        updateState("currentCampaign", _.find(tokens, ["symbol", symbol]))
      );
    }
    return () => {
      scrollTop();
      updateState("timeSold", timeSold);
      setTimeSold(timeSold);
      // updateState("currentCampaign", null);
    };
  }, [currentCampaign, symbol, getTokens, setTimeSold, timeSold, updateState]);

  if (!currentCampaign) return <CircularProgress />;

  return (
    <div className="token-page">
      <div className="content">
        <TokenInfo />
        <HourInfo />
        <Trade />
      </div>
    </div>
  );
};

TokenDetail.propTypes = {};

TokenDetail.defaultProps = {};

export default TokenDetail;
