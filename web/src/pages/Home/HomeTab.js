import React, { useState } from "react";
import PropTypes from "prop-types";

const TAB_POLITICS = "politics";
const TAB_ECONOMICS = "economics";
const TAB_TECHNOLOGY = "technology";
const TAB_JOURNALISM = "journalism";
const TAB_ENTERTAINMENT = "entertainment";

const HomeTab = props => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="home-tab">
      Buy the hours or leaders
      <br />
      whose time value is donated to change the world
      <div className="tabs">
        <div
          className={`tab-item hover-link ${tabIndex === 0 && "selected"}`}
          onClick={() => setTabIndex(0)}
        >
          Politics
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === 1 && "selected"}`}
          onClick={() => setTabIndex(1)}
        >
          Economics
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === 2 && "selected"}`}
          onClick={() => setTabIndex(2)}
        >
          Technology
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === 3 && "selected"}`}
          onClick={() => setTabIndex(3)}
        >
          Journalism
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === 4 && "selected"}`}
          onClick={() => setTabIndex(4)}
        >
          Entertainment
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === 5 && "selected"}`}
          onClick={() => setTabIndex(5)}
        >
          Business
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === 6 && "selected"}`}
          onClick={() => setTabIndex(6)}
        >
          Sports
        </div>
      </div>
    </div>
  );
};

HomeTab.propTypes = {};

HomeTab.defaultProps = {};

export default HomeTab;
