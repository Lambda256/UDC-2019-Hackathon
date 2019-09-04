import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import TokenDetail from "pages/TokenDetail";
import GridItem from "./GridItem";
import GridLoading from "./GridLoading";
import HomeTab from "./HomeTab";
import AppContext from "contexts/AppContext";
import HomeContext from "contexts/HomeContext";
import { scrollTop } from "utils/scroller";

const Home = props => {
  const { updateState } = useContext(AppContext);
  const { fetchingTokens, getTokens, tokens } = useContext(HomeContext);
  useEffect(() => {
    scrollTop();
    getTokens();
  }, []);
  return (
    <div className="home">
      <HomeTab />
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
          tokens.length > 0 && tokens.map(token => {
            return <GridItem key={token.id} data={token} />;
          })
        )}
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
