import React, { useEffect } from "react";
import * as d3 from "d3";

const StepChart = props => {
  useEffect(() => {
    let data = [
      {
        start_date: "2015-09-04",
        end_date: "2015-09-08",
        points: 26.44
      },
      {
        start_date: "2015-09-20",
        end_date: "2015-09-24",
        points: 55.35
      },
      {
        start_date: "2015-09-24",
        end_date: "2015-09-28",
        points: 57.51
      },
      {
        start_date: "2015-09-28",
        end_date: "2015-10-07",
        points: 36.55
      },
      {
        start_date: "2015-10-07",
        end_date: "2015-10-12",
        points: 15.74
      }
    ];

    let margin = { top: 20, right: 20, bottom: 50, left: 0 },
      width = 400,
      height = 100;

    let parseDate = d3.timeParse("%Y-%m-%d"),
      bisectDate = d3.bisector(d => d.start_date).left,
      formatDate = d3.timeFormat("%m-%d");

    const x = d3.scaleTime().range([0, width]);
    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.points)])
      // .domain([0, 260])
      .nice()
      .range([height - margin.bottom, margin.top]);
     y = d3.scaleLinear().range([height - margin.bottom, margin.top, 0]);

    const xAxis = d3
      .axisBottom(x)
      .ticks(d3.timeSunday, 1)
      .tickSize(-height, 0, 0)
      .tickFormat(d => formatDate(d));

    // const yAxis = d3
    //   .axisLeft(y)
    //   .ticks(6)
    //   .tickSize(-width, 0, 0)
    //   .tickFormat(d => d);

    data.forEach((d, i) => {
      d.start_date = parseDate(d.start_date);
      d.end_date = parseDate(d.end_date);
    });

    x.domain([d3.min(data, d => d.start_date), d3.max(data, d => d.end_date)]);
    y.domain([30, 60]);

    let line = "M",
      fill = `M0,${height}`;

    let svg = d3
      .select("#step-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    data.forEach((d, i) => {
      let y0 = y(d.points),
        x0 = x(d.end_date);
      if (i === 0) {
        line += `${x(d.start_date)},${y0}H${x0}`;
      } else {
        line += `H${x0}`;
      }

      fill += `V${y0}H${x0}`;

      if (data[i + 1]) {
        line += `V${y(data[i + 1].points)}`;
      }
    });

    fill += `V${height}Z`;

    console.log(fill);

    const avg = d3.mean(data, d => d.points);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    // svg
    //   .append("g")
    //   .attr("class", "y axis")
    //   .call(yAxis)
    //   .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", ".71em")
    //   .style("text-anchor", "end")
    //   // .text("Points");

    svg
      .append("path")
      .attr("class", "line")
      .attr("d", line);

    svg
      .append("path")
      .attr("class", "path-fill")
      .attr("d", fill);

    svg
      .append("line")
      .attr("class", "avg-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y(avg))
      .attr("y2", y(avg));

    let focus = svg
      .append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    focus
      .append("circle")
      .attr("class", "tooltip-point")
      .attr("r", 6);

    focus
      .append("text")
      .attr("class", "y1")
      .attr("dx", "-2em")
      .attr("dy", "-.75em");

    focus
      .append("line")
      .attr("class", "tooltip-line tooltip-start-date")
      .attr("y1", height)
      .attr("y2", height);

    focus
      .append("line")
      .attr("class", "tooltip-line tooltip-end-date")
      .attr("y1", height)
      .attr("y2", height);

    focus
      .append("line")
      .attr("class", "tooltip-line tooltip-mileage")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height)
      .attr("y2", height);

    focus
      .append("text")
      .attr("class", "x1")
      .attr("dx", "-4.5em")
      .attr("dy", "-.5em")
      .attr("transform", "rotate(90)");

    focus
      .append("text")
      .attr("class", "x2")
      .attr("dx", "-4.5em")
      .attr("dy", "-.5em");

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => focus.style("display", "none"))
      .on("mousemove", mousemove);

    function mousemove() {
      let x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d = data[i - 1];

      focus
        .select("circle.tooltip-point")
        .attr("transform", `translate(${d3.mouse(this)[0]},${y(d.points)})`);

      focus
        .select("text.y1")
        .text(d.points)
        .attr("transform", `translate(${d3.mouse(this)[0]}, ${y(d.points)})`);

      focus
        .select("text.x1")
        .text(formatDate(d.start_date))
        .attr(
          "transform",
          `translate(${x(d.start_date)}, ${(height + y(d.points)) /
            2}) rotate(-90)`
        );

      focus
        .select("line.tooltip-start-date")
        .attr("y2", y(d.points))
        .attr("x1", x(d.start_date))
        .attr("x2", x(d.start_date));

      focus
        .select("text.x2")
        .text(formatDate(d.end_date))
        .attr(
          "transform",
          `translate(${x(d.end_date)}, ${(height + y(d.points)) /
            2}) rotate(-90)`
        );

      focus
        .select("line.tooltip-end-date")
        .attr("y2", y(d.points))
        .attr("x1", x(d.end_date))
        .attr("x2", x(d.end_date));

      focus
        .select("line.tooltip-mileage")
        .attr("y1", y(d.points))
        .attr("y2", y(d.points));
    }
  }, []);
  return (
    <div className="step-chart-container">
      <div id="step-chart" />
    </div>
  );
};

StepChart.propTypes = {};

StepChart.defaultProps = {};

export default StepChart;
