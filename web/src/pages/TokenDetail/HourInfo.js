import React, { useContext } from "react";
import { Carousel } from "antd";
import AppContext from "contexts/AppContext";
import linkedin from "assets/images/linkedin.svg";
import facebook from "assets/images/facebook.svg";
import instagram from "assets/images/instagram.svg";
import _ from 'lodash';

const HourInfo = props => {
  const { currentCampaign } = useContext(AppContext);
  const { images, social_links, offers, symbol, description } = currentCampaign;

  return (
    <div className="hour-of-container">
      <div className="card-header text-grey uppercase">
        An hour of {symbol} token
      </div>
      <div className="hour-description text-white">{offers}</div>
      <Carousel className="carousel" autoplay>
        {_.tail(images).map((image, index) => {
          return (
            <img key={index} className="carousel-item" src={image} alt="" />
          );
        })}
      </Carousel>
      <div className="description text-grey">
      {description}
      </div>
      <div className="social-icons">
        {social_links["linked_in"] && (
          <a
            href={social_links["linked_in"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="social-icon" src={linkedin} alt="" />
          </a>
        )}
        {social_links["facebook"] && (
          <a
            href={social_links["facebook"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="social-icon" src={facebook} alt="" />
          </a>
        )}
        {social_links["instagram"] && (
          <a
            href={social_links["instagram"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="social-icon" src={instagram} alt="" />
          </a>
        )}
      </div>
    </div>
  );
};

export default HourInfo;
