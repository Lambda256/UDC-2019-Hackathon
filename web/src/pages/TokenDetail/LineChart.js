import React, { useEffect, useContext } from "react";
import AppContext from "contexts/AppContext";
import * as d3 from "d3";

const LineChart = props => {
    const { currentCampaign } = useContext(AppContext);
    useEffect(() => {
        var w = 380;
        var h = 300;
        var x = d3
            .scaleLinear()
            .domain([0, 45])
            .range([0, w]);

        var y = d3
            .scaleLinear()
            .domain([0, 100])
            .range([h + 30, 0]);

        var svg = d3
            .select("#line-chart")
            .append("svg:svg")
            .attr("height", h)
            .attr("width", w);

        var dataset = d3.range(0, 100);

        var initialarea = d3.line()(
            dataset.map(function(xi) {
                return [x(xi), y(0)];
            })
        );

        var line = d3.line()(
            dataset.map(function(xi) {
                return [x(xi), y(tokenFunction(xi))];
            })
        );

        function tokenFunction(xi) {
            return 10 * Math.pow(1 + 0.05, xi);
        }

        svg.append("path")
            .datum(dataset) // 10. Binds data to the line
            .attr("class", "line") // Assign a class for styling
            .attr("d", initialarea) // initial state (line at the bottom)
            .transition()
            .duration(1500)
            .attr("d", line); // 11. Calls the line generato

        svg.selectAll(".dot")
            .data(dataset)
            .enter()
            .append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function(d, i) {
                return x(i);
            })
            .attr("cy", function(d, i) {
                return y(tokenFunction(i));
            });

        svg.append("svg:text")
            .attr("x", 100)
            .attr("y", 100)
            .append("svg:tspan")
            .attr("x", 220)
            .attr("dy", 150)
            .attr("fill", "#ee0804")
            .attr("font-size", 14) //font size
            .text(function(d) {
                return "y=$10*(1+0.05)^x";
            });

        svg.append("svg:text")
            .attr("x", 100)
            .attr("y", 100)
            .append("svg:tspan")
            .attr("x", 220)
            .attr("dy", 166)
            .attr("fill", "#a6a7a8")
            .attr("font-size", 14) //font size
            .text(function(d) {
                return `20 token holders now`;
            });

        svg.append("svg:text")
            .attr("x", 100)
            .attr("y", 100)
            .append("svg:tspan")
            .attr("x", 220)
            .attr("dy", 182)
            .attr("fill", "#a6a7a8")
            .attr("font-size", 14) //font size
            .text(function(d) {
                return `Current price = $${currentCampaign.current_price}`;
            });
    }, [currentCampaign.current_price]);
    return <div id="line-chart"></div>;
};

LineChart.propTypes = {};

LineChart.defaultProps = {};

export default LineChart;
