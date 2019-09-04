import React, { useEffect, useContext } from "react";
import { Affix } from "antd";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import AppContext from "contexts/AppContext";
import HomeContext from "contexts/HomeContext";
import { Power3, TweenMax, Elastic } from "gsap/all";
import moment from "moment";
import numeral from "numeral";

const select = function(s) {
  return document.querySelector(s);
};

const Clock = props => {
  const { currentCampaign, timeSold, setTimeSold } = useContext(AppContext);
  const { tokens } = useContext(HomeContext);
  const fadeIn = props.history.location.pathname.indexOf("/token") > -1;

  let totalDonation = tokens.reduce((total, token) => total + numeral(token.total_donation).value(), 0);

  useEffect(() => {
    var xmlns = "http://www.w3.org/2000/svg",
      alarmBell = select(".alarmBell"),
      clockGroup = select(".clockGroup"),
      dottedLine = select(".dottedLine"),
      hourHand = select(".hourHand"),
      minuteHand = select(".minuteHand"),
      secondHand = select(".secondHand"),
      nameGroup = select(".nameGroup"),
      timeLabelGroup = select(".timeLabelGroup"),
      timeScaleGroup = select(".timeScaleGroup"),
      timeScaleMarkerGroup = select(".timeScaleMarkerGroup"),
      maxMinutes = 1440,
      maxHours = 24,
      timeScaleInterval = 60,
      minutesInHour = 60,
      centerX = 160,
      minuteHandMaxRotation = 360 * maxHours,
      hourRotationStep = 360 / 12,
      timeScaleMarkerColor = "#7e7e7e",
      multiplier = 2.0,
      timeScaleMarkers = 5,
      maxDrag = maxMinutes * multiplier,
      alarmBellOffsetX = 151,
      clockTime = `${moment().hours()}.${parseInt(
        (moment().minutes() / 60) * 100
      )}`,
      interval: null;

    TweenMax.set("svg", {
      visibility: "visible"
    });
    TweenMax.set([hourHand, minuteHand, secondHand], {
      transformOrigin: "50% 100%"
    });

    TweenMax.set(".timeScaleHit", {
      width: maxDrag
    });
    TweenMax.set(clockGroup, {
      y: -20
    });

    TweenMax.set(alarmBell, {
      attr: {
        x: alarmBellOffsetX
      }
    });

    if (props.history.location.pathname.includes("/token")) {
      TweenMax.to(clockGroup, 1, {
        x: 2000,
        ease: Power3.easeOut
      });

      TweenMax.to(nameGroup, 1, {
        left: "50%",
        ease: Power3.easeOut
      });

      TweenMax.to(timeScaleGroup, 2, {
        x: -(timeSold / 10) * (timeScaleInterval * multiplier),
        onUpdate: dragUpdate,
        ease: Power3.easeOut
      });
      if (!timeScaleMarkerGroup.hasChildNodes()) {
        makeTimeScale();
      }
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    } else {
      TweenMax.to(clockGroup, 1, {
        x: 0,
        ease: Power3.easeOut
      });

      TweenMax.to(nameGroup, 2, {
        left: -2000,
        ease: Power3.easeOut
      });

      TweenMax.to(timeScaleGroup, 2, {
        x: -(timeSold / 10) * (timeScaleInterval * multiplier),
        onUpdate: dragUpdate,
        ease: Power3.easeOut
      });

      if (!timeScaleMarkerGroup.hasChildNodes()) {
        makeTimeScale();
      }

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }

    function makeTimeScale() {
      var marker, labelGroup;
      while (timeScaleMarkerGroup.firstChild) {
        timeScaleMarkerGroup.removeChild(timeScaleMarkerGroup.firstChild);
      }

      for (var i = 0; i <= maxMinutes * 2.5; i++) {
        //console.log(i % 5)
        marker = document.createElementNS(xmlns, "line");
        timeScaleMarkerGroup.appendChild(marker);

        var posX = centerX + i * multiplier;

        if (i % timeScaleInterval === 0) {
          labelGroup = timeLabelGroup.cloneNode(true);
          timeScaleMarkerGroup.appendChild(labelGroup);
          labelGroup
            .querySelector(".timeLabelBtn")
            .setAttribute("data-btnId", i / minutesInHour);
          TweenMax.set(marker, {
            attr: {
              x1: posX,
              x2: posX,
              y1: 380,
              y2: 360
            },
            stroke: timeScaleMarkerColor,
            strokeWidth: 1
          });

          TweenMax.set(labelGroup, {
            x: posX,
            y: 355
          });

          // labelGroup.querySelector(".timeLabel").textContent = String(
          //   initTime - 12 + i / minutesInHour
          // );
          labelGroup.querySelector(".timeLabel").textContent = String(
            (i / minutesInHour) * 10
          );

          //every 30 minutes
        } else if (i % (minutesInHour / 2) === 0) {
          TweenMax.set(marker, {
            attr: {
              x1: posX,
              x2: posX,
              y1: 380,
              y2: 365
            },
            stroke: timeScaleMarkerColor,
            strokeWidth: 1
          });
          //every timeScaleMarkers minutes (5)
        } else if (i % timeScaleMarkers === 0) {
          TweenMax.set(marker, {
            attr: {
              x1: posX,
              x2: posX,
              y1: 380,
              y2: 370
            },
            stroke: timeScaleMarkerColor,
            strokeWidth: 1
          });
        } else {
          timeScaleMarkerGroup.removeChild(marker);
        }
      }
    }

    function dragUpdate() {
      const x = -clockTime * (timeScaleInterval * multiplier);
      var dragPosX = Math.round(x / multiplier),
        minuteHandPercent = Math.abs(dragPosX / maxMinutes),
        minuteHandRotation = minuteHandPercent * minuteHandMaxRotation,
        hourHandPercent = Math.abs((dragPosX / maxMinutes) * maxHours),
        hourHandRotation = hourHandPercent * hourRotationStep;

      const extraRotation = (moment().seconds() * 6) % 360;
      const secondHandRotation = minuteHandRotation * 60;
      const totalRotation = extraRotation + secondHandRotation;

      const duration = 2;
      TweenMax.to(secondHand, 0.45, {
        rotation: totalRotation,
        // ease: Elastic.easeOut.config(0.3, 0.1),
        onComplete: () => {
          if (!interval) {
            interval = setInterval(() => {
              const rotation =
                ((moment().seconds() * 6) % 360) + secondHandRotation;
              TweenMax.to(secondHand, 0.1, {
                rotation: rotation,
                ease: Elastic.easeOut.config(0.3, 0.8)
              });
            }, 1000);
          }
        }
      });

      TweenMax.to(minuteHand, duration, {
        rotation: minuteHandRotation,
        ease: Elastic.easeOut.config(0.3, 0.8)
      });

      TweenMax.to(hourHand, duration, {
        rotation: hourHandRotation,
        ease: Elastic.easeOut.config(0.3, 0.8)
      });

      //dotted line raise
      var diff = Math.abs(hourHandPercent - Math.round(hourHandPercent));
      //
      TweenMax.to(dottedLine, 0.1, {
        attr: {
          y2: diff > 0.2 ? 405 : 360
        }
      });
    }
  }, [timeSold, currentCampaign, setTimeSold]);

  return (
    <div className="clock">
      <svg
        className="alarmSVG"
        viewBox="0 0 320 380"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="bell"
            d="M18.3,18.7h-6.2c-0.2,1.2-1.4,2.1-3,2.1c-1.6,0-2.8-0.9-3-2.1H0v-2.7c2.1-1.1,2.6-2.7,2.7-3.6c0,0,0-4,0-4.3
  c0-3.1,2.2-5.7,5.1-6.3V1.4C7.8,0.6,8.4,0,9.2,0c0.8,0,1.4,0.6,1.4,1.4V2c2.7,0.6,4.8,2.9,5,5.7l0,4.9c0.1,0.9,0.6,2.4,2.8,3.5V18.7
  z"
          />
          <g className="timeLabelGroup">
            <text className="timeLabel" />
            <rect
              className="timeLabelBtn"
              width="40"
              height="40"
              y="-30"
              x="-15"
              fill="transparent"
            />
          </g>
        </defs>

        <line
          opacity="1"
          className="dottedLine"
          x1="50%"
          x2="50%"
          y1="289"
          y2="370"
          strokeDasharray="4"
          stroke="#979797"
        />

        <g className="maskedTimeScale">
          <g className="timeScaleGroup">
            <rect
              className="timeScaleHit"
              width="2880"
              x="160"
              height="160"
              y="400"
              fill="transparent"
            />
            <g className="timeScaleMarkerGroup" />

            <g className="alarmBell" opacity="0">
              <use x="151" y="468" xlinkHref="#bell" fill="#3498DB" />
            </g>
          </g>
        </g>
        <g className={`clockGroup`} stroke="#979797">
          <circle
            cx="50%"
            cy="140"
            r="80"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <line
            className="secondHand"
            stroke="#ee0804"
            x1="50%"
            y1="140"
            x2="50%"
            y2="75"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <line
            className="minuteHand"
            stroke="#979797"
            x1="50%"
            y1="140"
            x2="50%"
            y2="75"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            className="hourHand"
            stroke="#979797"
            x1="50%"
            y1="140"
            x2="50%"
            y2="105"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="5"
          />
          <circle
            className="centerDot"
            cx="50%"
            cy="140"
            r="4"
            fill="#212121"
            stroke="#ee0804"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            className="clockDragger"
            cx="50%"
            cy="99"
            r="70"
            fill="transparent"
            strokeWidth="0"
          />
          <svg
            className="intime"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="20"
            viewBox="0 0 80 18"
            x="41%"
            y="175"
            stroke="none"
          >
            <g fill="none" fillRule="evenodd">
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M34.617 1.79v3.1h4.875v1.693h-4.875v6.956c0 .497.063.908.19 1.23.126.324.299.583.52.776.22.193.475.33.763.408.288.079.594.118.917.118.237 0 .481-.013.734-.041.252-.028.498-.061.739-.1a16.321 16.321 0 0 0 1.189-.237l.308 1.55c-.182.11-.403.207-.663.29-.26.082-.544.153-.852.213a11.171 11.171 0 0 1-2 .183c-.567 0-1.098-.08-1.59-.243a3.298 3.298 0 0 1-1.284-.769c-.363-.35-.65-.804-.858-1.36-.21-.556-.314-1.229-.314-2.018V6.583h-3.36V4.89h3.36v-3.1h2.201zm39.442 2.864c.923 0 1.73.16 2.42.48.69.319 1.264.76 1.721 1.324a5.654 5.654 0 0 1 1.023 1.994 8.78 8.78 0 0 1 .338 2.485v.982h-9.146c.024.583.136 1.131.337 1.644.201.513.477.96.828 1.343a3.826 3.826 0 0 0 2.881 1.236c.781 0 1.475-.157 2.083-.473a4.517 4.517 0 0 0 1.514-1.254l1.337 1.041a5.08 5.08 0 0 1-.799.929c-.32.296-.688.558-1.106.787a6.224 6.224 0 0 1-1.42.55 6.823 6.823 0 0 1-1.727.207c-.9 0-1.725-.154-2.479-.461a5.624 5.624 0 0 1-1.934-1.29 5.9 5.9 0 0 1-1.254-1.964 6.66 6.66 0 0 1-.45-2.473v-.497c0-1.033.166-1.958.497-2.774.331-.817.771-1.507 1.32-2.07a5.756 5.756 0 0 1 1.869-1.296c.698-.3 1.413-.45 2.147-.45zm-66.82.237v10.908h4.177v1.893H.696V15.8H5.05V6.796H.696V4.89H7.24zM21 4.654c.67 0 1.28.095 1.828.284.548.19 1.016.485 1.402.887.387.403.684.913.893 1.533.21.619.314 1.354.314 2.206v8.128h-2.189v-8.08c0-.568-.063-1.05-.19-1.444-.125-.394-.313-.714-.561-.958a2.196 2.196 0 0 0-.911-.533 4.208 4.208 0 0 0-1.237-.165c-.733 0-1.378.183-1.934.55-.556.367-1 .85-1.331 1.45v9.18h-2.189V4.891h1.964l.154 1.893a5.084 5.084 0 0 1 1.715-1.556c.679-.375 1.436-.566 2.272-.574zm41.63 0c.94 0 1.661.288 2.166.864.505.576.757 1.447.757 2.615v9.56H63.47V8.108c0-1.073-.493-1.605-1.48-1.597-.26 0-.484.035-.673.106-.19.071-.348.168-.474.29a1.334 1.334 0 0 0-.296.426c-.07.162-.118.33-.141.503v9.855h-2.083V8.097c0-.513-.114-.907-.343-1.183-.229-.276-.591-.41-1.088-.402-.458 0-.813.09-1.065.272a1.584 1.584 0 0 0-.556.721v10.187h-2.083V4.891h1.964l.06 1.207c.26-.45.6-.801 1.023-1.053.422-.253.933-.383 1.532-.39 1.175 0 1.96.457 2.355 1.372.252-.41.585-.74 1-.988.413-.249.916-.377 1.508-.385zm11.43 1.798c-.442 0-.86.081-1.254.243-.395.162-.75.398-1.065.71a4.048 4.048 0 0 0-.799 1.148 5.454 5.454 0 0 0-.455 1.567h6.886v-.165a4.887 4.887 0 0 0-.243-1.266 3.527 3.527 0 0 0-.61-1.124 3.049 3.049 0 0 0-1.01-.805c-.407-.205-.89-.308-1.45-.308zM6.079.241c.434 0 .762.124.983.373.22.248.33.554.33.917 0 .355-.11.65-.33.887-.221.237-.549.355-.982.355-.442 0-.771-.118-.988-.355-.217-.237-.326-.532-.326-.887 0-.363.109-.669.326-.917.217-.249.546-.373.988-.373z"
              />
              <circle cx="46.154" cy="7.692" r="2.308" fill="#EE0804" />
              <circle cx="46.154" cy="15.385" r="2.308" fill="#EE0804" />
            </g>
          </svg>
        </g>

        <text className="meridianLabel" x="50%" y="250">
          {timeSold} HOURS
        </text>
        <text className="meridianSublabel" x="50%" y="270">
          have generated a donation fund of {" "}
          {currentCampaign
            ? numeral(currentCampaign.total_donation).format("$0,0.00")
            : numeral(totalDonation).format("$0,0.00")}
        </text>
      </svg>

      <div className="nameGroup">
        <Affix>
          <div className="name-header uppercase">
            {currentCampaign ? currentCampaign.owner.name : ""}
          </div>
        </Affix>
        <div className="job text-grey">
          {currentCampaign ? currentCampaign.owner.short_description : ""}
        </div>
      </div>

      <div className={`banner-container ${fadeIn && "fadeIn"}`}>
        <img
          className="banner-img"
          src={
            currentCampaign
              ? currentCampaign.images[0]
              : "http://placekitten.com/g/1000/600"
          }
          alt=""
        />
        <div className="gradient" />
      </div>
    </div>
  );
};

Clock.propTypes = {};

Clock.defaultProps = {};

export default withRouter(Clock);
