import React from "react";

export const TAB_ALL = "all";
export const TAB_POLITICS = "politics";
export const TAB_ECONOMICS = "economics";
export const TAB_TECHNOLOGY = "technology";
export const TAB_JOURNALISM = "journalism";
export const TAB_ENTERTAINMENT = "entertainment";
export const TAB_BUSINESS = "business";
export const TAB_SPORT = "sport";

const HomeTab = props => {
  const {tabIndex, setTabIndex} = props;
  return (
    <div className="home-tab">
      Buy the hours of leaders
      <br />
      whose time value is donated to change the world
      <div className="tabs">
         <div
          className={`tab-item hover-link ${tabIndex === TAB_ALL && "selected"}`}
          onClick={() => setTabIndex(TAB_ALL)}
        >
          All
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === TAB_POLITICS && "selected"}`}
          onClick={() => setTabIndex(TAB_POLITICS)}
        >
          Politics
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === TAB_ECONOMICS && "selected"}`}
          onClick={() => setTabIndex(TAB_ECONOMICS)}
        >
          Economics
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === TAB_TECHNOLOGY && "selected"}`}
          onClick={() => setTabIndex(TAB_TECHNOLOGY)}
        >
          Technology
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === TAB_JOURNALISM && "selected"}`}
          onClick={() => setTabIndex(TAB_JOURNALISM)}
        >
          Journalism
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === TAB_ENTERTAINMENT && "selected"}`}
          onClick={() => setTabIndex(TAB_ENTERTAINMENT)}
        >
          Entertainment
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === TAB_BUSINESS && "selected"}`}
          onClick={() => setTabIndex(TAB_BUSINESS)}
        >
          Business
        </div>
        <div
          className={`tab-item hover-link ${tabIndex === TAB_SPORT && "selected"}`}
          onClick={() => setTabIndex(TAB_SPORT)}
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
