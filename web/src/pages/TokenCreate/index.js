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
  const [offer, setOffer] = useState(
    "Jay Park can provide tips to build a scalable blockchain business"
  );
  const [description, setDescription] = useState(
    "Jay Park is the CEO of Lambda 256, a subsidiary of Dunamu which services the 'Luniverse' blockchain service platform. After joining Dunamu in May 2018 as the head of its research arm, Park was named the CEO of the newly-formed Lambda 256 subsidiary in March 2019. He majored in computer science at Pohang University of Science and Technology. Park started his career in 1994 as a senior researcher at Hyundai Electronics S/W Lab, where he developed object-oriented DBMS and middleware, and CORBA based data management systems. From 2008 to 2016, he led Samsung Pay’s service development and business as the GM, and also headed the development of the Knox message service and push marketing platform in the Mobile Business Division. Park also previously served as an executive at SK Telecom."
  );
  const [linked_in, setLinkedin] = useState("https://www.linkedin.com/in/wisefree/");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("https://www.facebook.com/jaehyunpark.kr");
  const [initial_price, setPrice] = useState(0);
  const [category, setCategory] = useState("technology");
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
