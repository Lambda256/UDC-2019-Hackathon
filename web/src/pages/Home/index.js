import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import GridItem from "./GridItem";
import GridLoading from "./GridLoading";
import HomeTab from "./HomeTab";
import AppContext from "contexts/AppContext";
import HomeContext from "contexts/HomeContext";
import { scrollTop } from "utils/scroller";
import { TAB_ALL } from "./HomeTab";
import numeral from "numeral";

const Home = props => {
  const [tabIndex, setTabIndex] = useState(TAB_ALL);
  const { setTimeSold } = useContext(AppContext);
  const { fetchingTokens, getTokens, tokens } = useContext(HomeContext);
  useEffect(() => {
    scrollTop();
    getTokens(tokens => {
      const totalHours = tokens.reduce(
        (total, token) => total + numeral(token.purchase_count).value(),
        0
      );
      setTimeSold(totalHours);
    });
  }, [getTokens, setTimeSold]);
  return (
    <div className="home">
      <HomeTab tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <div className="content">
        <div className="token-list">
          {fetchingTokens ? (
            <>
              <GridLoading />
              <GridLoading />
              <GridLoading />
              <GridLoading />
              <GridLoading />
              <GridLoading />
              <GridLoading />
              <GridLoading />
            </>
          ) : (
            tokens.length > 0 &&
            tokens
              .filter(item => {
                if (tabIndex === TAB_ALL) return true;
                return item.category === tabIndex;
              })
              .map(token => {
                return <GridItem key={token.id} data={token} />;
              })
          )}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default withRouter(Home);
