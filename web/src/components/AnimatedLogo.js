import React, { useEffect } from "react";
import { CountUp } from "countup.js";
import _ from "lodash";

const animate = (id, delay, lastValue, timeout) => {
  var countUp = new CountUp(id, _.random(3000), {
    useEasing: true,
    formattingFn: number => {
      const str = String(number);
      return str.charAt(str.length - 1);
    }
  });

  countUp.start();
  timeout = setTimeout(() => {
    if (document.getElementById(id)) {
      countUp.pauseResume();
      document.getElementById(id).innerHTML = lastValue;
    }
  }, delay);
};

const AnimatedLogo = props => {
  useEffect(() => {
    let timeout1, timeout2, timeout3, timeout4, timeout5;
    animate("intime-i", _.random(1000, 1600), "i", timeout1);
    animate("intime-n", _.random(1000, 1600), "n", timeout2);
    animate("intime-t", _.random(1000, 1600), "t", timeout3);
    animate("intime-m", _.random(1000, 1600), "m", timeout4);
    animate("intime-e", _.random(1000, 1600), "e", timeout5);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      clearTimeout(timeout5);
    };
  }, []);
  return (
    <div className="row-align-center">
      <div id="intime-i" className="intime-letter" />
      <div id="intime-n" className="intime-letter" />
      <div id="intime-t" className="intime-letter" />
      <div id="intime-:" className="intime-letter" style={{ color: "#ee0804" }}>
        :
      </div>
      <div id="intime-m" className="intime-letter" />
      <div id="intime-e" className="intime-letter" />
    </div>
  );
};

AnimatedLogo.propTypes = {};

AnimatedLogo.defaultProps = {};

export default AnimatedLogo;
