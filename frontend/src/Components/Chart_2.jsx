import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Chart_2 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Define SVG dimensions and margins
    const width = 450;
    const height = 350;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;
    const innerRadius = radius / 1.6;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG element and group for chart
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Calculate total ACV for existing and new customers
    const totals = data.reduce(
      (acc, d) => {
        if (d.Cust_Type === "Existing Customer") {
          acc.existingACV += d.acv;
        } else if (d.Cust_Type === "New Customer") {
          acc.newACV += d.acv;
        }
        return acc;
      },
      { existingACV: 0, newACV: 0 }
    );

    // Prepare data for the pie chart
    const pieData = [
      { label: "Existing Customer", value: totals.existingACV },
      { label: "New Customer", value: totals.newACV },
    ];

    // Create pie and arc generators
    const pie = d3.pie().value((d) => d.value).sort(null);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);
    const outerArc = d3.arc().innerRadius(radius * 1).outerRadius(radius * 1);

    // Color scale
    const color = d3
      .scaleOrdinal()
      .domain(pieData.map((d) => d.label))
      .range(["#66c2a5", "#ff8c26"]);

    // Create pie chart slices
    const arcs = svg.selectAll("arc").data(pie(pieData)).enter().append("g").attr("class", "arc");

    // Append paths (slices) to the chart with transitions
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .transition()
      .duration(1000)
      .attrTween("d", (d) => {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => arc(interpolate(t));
      });

    // Append total ACV text in the center of the donut chart
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .text(`${(totals.existingACV + totals.newACV) / 1000}k`)
      .style("font-size", "24px")
      .style("font-weight", "bold");

    // Append text labels for each slice
    arcs
      .append("text")
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d);
        const offset = radius * 0.1;
        pos[0] = pos[0] > 0 ? pos[0] + offset : pos[0] - offset;
        return `translate(${pos})`;
      })
      .attr("text-anchor", (d) => (outerArc.centroid(d)[0] > 0 ? "start" : "end"))
      .text(
        (d) =>
          `$ ${(d.data.value / 1000).toFixed(1)}k ${"  "} ${(
            (d.data.value / d3.sum(pieData, (d) => d.value)) * 100
          ).toFixed(1)}%`
      )
      .style("font-size", 13)
      .style("font-weight", "semibold")
      .style("fill", "black");

    // Append polylines connecting slices to their labels
    arcs
      .append("polyline")
      .attr("points", (d) => {
        const pos = outerArc.centroid(d);
        const offset = radius * 0.5;
        pos[0] = pos[0] > 0 ? pos[0] + offset : pos[0] - offset;
        return [arc.centroid(d), outerArc.centroid(d), pos];
      })
      .style("fill", "none")
      .style("stroke", "gray")
      .style("stroke-width", 1.2)
      .style("opacity", 0.5);

    // Tooltip for interactivity
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("padding", "5px 10px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "5px")
      .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.1)")
      .style("pointer-events", "none")
      .style("opacity", 0);

    arcs
      .on("mouseover", (event, d) => {
        tooltip
          .html(
            `<strong>${d.data.label}</strong><br/>Value: $${(d.data.value / 1000).toFixed(1)}k<br/>Percentage: ${
              ((d.data.value / d3.sum(pieData, (d) => d.value)) * 100).toFixed(1)
            }%`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 30}px`)
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 30}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0).on("end", () => tooltip.style("left", "-9999px"));
      });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Chart_2;
