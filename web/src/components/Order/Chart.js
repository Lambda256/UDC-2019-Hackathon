import React, { useEffect } from "react";
import moment from "moment";
import numeral from "numeral";
import * as d3 from "d3";

var margin = { top: 40, right: 20, bottom: 30, left: 40 };

const Chart = props => {
  const { width, height, showAxis, graphData } = props;
  useEffect(() => {
    // set the dimensions and margins of the graph

    // append the svg object to the body of the page
    if (graphData) {
      console.log("DATA", graphData);
      // const generateGraph = async () => {
      // const data = Object.assign(
      //   (await d3.csv(
      //     "https://gist.githubusercontent.com/mbostock/14613fb82f32f40119009c94f5a46d72/raw/d0d70ffb7b749714e4ba1dece761f6502b2bdea2/aapl.csv",
      //     d3.autoType
      //   ))
      //       // .filter((item, index) => index < 80)
      //       .map(({ date, close }) => ({ date, value: close, label: "hello" }))
      //   );

      const generateGraph = () => {
        const data = Object.assign(graphData, d3.autoType).map(
          ({ price, updated_at }, index) => ({
            date: moment(updated_at),
            value: numeral(price).value(),
            label: "hello"
          })
        );

        console.log("data format", data);
        const x = d3
          .scaleUtc()
          .domain(d3.extent(data, d => d.date))
          .range([margin.left, width - margin.right]);

        const y = d3
          .scaleLinear()
          .domain(d3.extent(data, d => d.value))
          // .domain([0, d3.max(data, d => d.value)])
          // .domain([0, 260])
          .nice()
          // .range([height + margin.bottom, margin.top]);
          .range([height - margin.bottom, margin.top]);

        var initialarea = d3
          .area()
          .x(function(d) {
            return x(d.date);
          })
          .y0(height)
          .y1(height);

        const area = d3
          .area()
          .x(d => x(d.date))
          .y0(y(0))
          .y1(d => y(d.value));

        // var area = function(datum, boolean) {
        //   return d3
        //     .area()
        //     .y0(height - margin.bottom)
        //     .y1(function(d) {
        //       return y(d.value);
        //     })
        //     .x(function(d) {
        //       return boolean ? x(d.date) : 0;
        //     })(datum);
        // };

        const xAxis = g =>
          g
            .attr("color", "#fff")
            // .attr("color", "#000")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(
              d3
                .axisBottom(x)
                .ticks(width / 200)
                .tickSizeOuter(0)
            );

        const yAxis = g =>
          g
            .attr("color", "#fff")
            // .attr("color", "#ee0804")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(height / 50))
            .call(g => g.select(".domain").remove())
            .call(g =>
              g
                .select(".tick:last-of-type text")
                .clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y)
            );

        var svg = d3
          .select("#graph")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        var defs = svg.append("svg:defs");
        defs
          .append("svg:pattern")
          .attr("id", "grump_avatar")
          .attr("width", 48)
          .attr("height", 48)
          .append("svg:image")
          .attr("xlink:href", "https://placekitten.com/48/48")
          .attr("width", 48)
          .attr("height", 48)
          .attr("x", 0)
          .attr("y", 0);

        const bgGradient = defs
          .append("linearGradient")
          .attr("id", "bg-gradient")
          .attr("gradientTransform", "rotate(90)");

        bgGradient
          .append("stop")
          .attr("stop-color", "#a6a7a8")
          .attr("offset", "90%");
        bgGradient
          .append("stop")
          .attr("stop-color", "rgba(0,0,0,0)")
          .attr("offset", "0%");

        defs
          .append("clipPath")
          .attr("id", "clip-line-path")
          .append("path")
          .attr("d", area(data))
          .attr("class", "value-line");

        svg
          .append("path")
          .data([data])
          .attr("class", "area")
          // .attr("fill", "url(#bg-gradient)")
          .attr("fill", "#a6a7a8")
          // .attr("fill", "#ee0804")
          // .attr("fill", "#fff")
          .attr("d", initialarea) // initial state (line at the bottom)
          .transition()
          .duration(1000)
          .attr("d", area); // final state

        // svg
        //   .selectAll("myCircles")
        //   .data(data)
        //   // .data(data.filter((item, index) => index < 10))
        //   .enter()
        //   .append("circle")
        //   // .attr("fill", "#D13D73")
        //   // .attr("fill", "url(#grump_avatar)")
        //   .attr("width", 24)
        //   .attr("height", 24)
        //   .attr("cx", function(d) {
        //     return x(d.date);
        //   })
        //   .attr("cy", function(d) {
        //     return y(d.value);
        //   })
        //   .attr("r", 2)
        //   .on("mouseover", d => console.log("hello world", x(d.date)));

        showAxis && svg.append("g").call(xAxis);

        showAxis && svg.append("g").call(yAxis);

        // svg
        //   .append("g")
        //   .selectAll("text")
        //   .data(data)
        //   .enter()
        //   .append("text")
        //   .text(node => node.label)
        //   .attr("font-size", 12)
        //   .attr("text-anchor", "middle")
        //   .attr("dx", function(d) {
        //     return x(d.date);
        //   })
        //   .attr("dy", function(d) {
        //     return y(d.value) - 16;
        //   });
      };

      generateGraph();
    }
  }, [graphData, height, showAxis, width]);
  return (
    <div style={{ overflow: "scroll" }}>
      <div id="graph" />
    </div>
  );
};

Chart.propTypes = {};

Chart.defaultProps = {
  width: window.innerWidth * 2,
  height: 350 - margin.bottom,
  showAxis: true
};

export default Chart;
