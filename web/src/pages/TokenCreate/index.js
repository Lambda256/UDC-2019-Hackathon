import React, { useState, useRef, useContext } from "react";
import { Input, Select, Carousel, Button, Slider } from "antd";
import TokenContext from "contexts/TokenContext";
import CircularProgress from "components/CircularProgress";
import images from "constants/images";
import Screenshots from "./Screenshots";
import _ from "lodash";

const { Option } = Select;

const tabNames = [
  "create token symbol",
  "initial pricing",
  "charity selection",
  "about you",
  "screenshots"
];

const TokenCreate = props => {
  const { creating, createPrivateToken } = useContext(TokenContext);
  const [step, setStep] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [charity, setCharity] = useState("");
  const [offer, setOffer] = useState("");
  const [description, setDescription] = useState("");
  const [linked_in, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [initial_price, setPrice] = useState(0);
  const [category, setCategory] = useState("politics");
  const [files, setFiles] = useState([]);
  const slider = useRef(null);

  return (
    <div className="token-create-page">
      {creating && <CircularProgress />}
      <Carousel
        ref={slider}
        className="create-carousel"
        afterChange={s => setStep(s)}
        initialSlide={step}
        infinite={false}
      >
        <div className="carousel-page">
          <div className="carousel-content">
            <Input
              placeholder="Enter Token Symbol"
              value={symbol}
              onChange={e => setSymbol(e.target.value)}
            />
            <Button
              type="primary"
              className="next-button"
              onClick={() => {
                slider.current.next();
              }}
            >
              NEXT
            </Button>
          </div>
        </div>

        <div className="carousel-page">
          <div className="carousel-content">
            <div>
              <Input
                className="input-dollar"
                style={{ textAlign: "center", width: "80vw" }}
                prefix={<span className="text-white dollar">$</span>}
                value={initial_price}
                onChange={v => setPrice(v)}
              />
              <Slider
                className="slider-dollar"
                min={1}
                max={1000}
                onChange={v => setPrice(v)}
                value={initial_price}
              />
            </div>
            <Button
              type="primary"
              className="next-button"
              onClick={() => {
                slider.current.next();
              }}
            >
              NEXT
            </Button>
          </div>
        </div>

        <div className="carousel-page">
          <div className="carousel-content">
            <div className="row-align-center">
              {Object.keys(images).map(image => {
                return (
                  <div
                    key={image}
                    className={`charity-item ${image === charity &&
                      "selected"}`}
                    onClick={() => setCharity(image)}
                  >
                    <img src={images[image]} alt="" />
                    <div className="name">{_.upperCase(image)}</div>
                  </div>
                );
              })}
            </div>
            <Button
              type="primary"
              className="next-button"
              onClick={() => {
                slider.current.next();
              }}
            >
              NEXT
            </Button>
          </div>
        </div>

        <div className="carousel-page">
          <div className="carousel-content">
            <Input
              className="small-text"
              placeholder="What can you offer?"
              value={offer}
              onChange={e => setOffer(e.target.value)}
            />
            <Input
              className="small-text"
              placeholder="Short description about you"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <Input
              className="small-text"
              placeholder="Instagram"
              value={instagram}
              onChange={e => setInstagram(e.target.value)}
            />
            <Input
              className="small-text"
              placeholder="Linkedin"
              value={linked_in}
              onChange={e => setLinkedin(e.target.value)}
            />
            <Input
              className="small-text"
              placeholder="Facebook"
              value={facebook}
              onChange={e => setFacebook(e.target.value)}
            />
            <Select
              className="small-text"
              value={category}
              onChange={v => setCategory(v)}
            >
              <Option key="politics">Politics</Option>
              <Option key="economics">Economics</Option>
              <Option key="technology">Technology</Option>
              <Option key="journalism">Journalism</Option>
              <Option key="entertainment">Entertainment</Option>
              <Option key="business">Business</Option>
              <Option key="sport">Sport</Option>
            </Select>

            <Button
              type="primary"
              className="next-button"
              onClick={() => {
                slider.current.next();
              }}
            >
              NEXT
            </Button>
          </div>
        </div>

        <div className="carousel-page">
          <div className="carousel-content">
            <Screenshots files={files} setFiles={setFiles} />

            <Button
              type="primary"
              className="next-button"
              onClick={() => {
                createPrivateToken(
                  symbol,
                  initial_price,
                  charity,
                  offer,
                  description,
                  category,
                  { linked_in, facebook, instagram },
                  files
                );
              }}
            >
              CREATE TOKEN
            </Button>
          </div>
        </div>
      </Carousel>
      <div className="pagenum">
        <div className="carousel-header">{tabNames[step]}</div>
        <div className="num">{step + 1}/5 </div>
      </div>
    </div>
  );
};

TokenCreate.propTypes = {};

TokenCreate.defaultProps = {};

export default TokenCreate;
