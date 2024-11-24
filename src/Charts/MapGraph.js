import Card from '../UI/Card/Card';
import ChartContainer from '../ChartComponents/ChartContainer';

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { geoAlbersUsa, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import usa from "../Data/states-10m.json";
import Circle from '../ChartComponents/Circle';
import ActionIcons from "../Interactions/ActionIcons";
import { legendColor } from 'd3-svg-legend';

export default function MapGraph({ margin, data, predictedPrice, values, updatePostDisplay, ...props }) {
  const width = 800; // Adjust width for responsiveness
  const height = 500; // Adjust height for responsiveness
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let actions = [
    { value: "cursor", label: "Cursor" },
    { value: "brush", label: "Brush" },
  ];

  let states = topojson.feature(usa, usa.objects.states).features;
  let borders = topojson.mesh(usa, usa.objects.states);

  // Append geojson map
  const projection = geoAlbersUsa()
    .translate([innerWidth / 2, innerHeight / 2])
    .fitExtent([[0, 0], [innerWidth, innerHeight]], borders);

  const geoPathGenerator = geoPath().projection(projection);

  // color gradient
  let scores = [...new Set(data.map(d => d.similarity_score.toFixed(2)))].map(d => +d);
  var colorScale = d3.scaleQuantile()
    .domain(scores.reverse())
    .range(['blue', 'orange', 'red']);

  // create legend
  const legendCategories = ["Low", "Medium", "High"];
  const legendColors = ["blue", "orange", "red"];

  const legendScale = d3.scaleOrdinal()
    .domain(legendCategories) // Use words for the legend
    .range(legendColors); // Assign colors to categories

  const legendRef = useRef();
  useEffect(() => {
    const legend = legendColor()
      .useClass(true)              // Use CSS classes for styling
      .title("Recommendation Level")  // Updated title
      .titleWidth(100)             // Title width
      .scale(legendScale);         // Use the new legendScale

    // Attach the legend to the SVG element
    legend(d3.select(legendRef.current));
  }, [legendScale]);

  const radiusScale = d3.scaleSqrt()
    .domain(d3.extent(data, d => d.similarity_score))
    .range([2, 5]);

  ////////////////////////////////////
  // get unique posts with coordinates
  let uniqueNodes = data.filter((v, i, a) => {
    let coords = projection([v.longitude, v.latitude]);
    return coords && a.indexOf(v) === i;
  });
  ////////////////////////////////////
  // Brush
  const brushRef = useRef();
  useEffect(() => {
    let nodeBrush = d3.brush()
      .extent([[0, 0], [innerWidth, innerHeight]])
    nodeBrush(d3.select(brushRef.current));
    nodeBrush
      .on('start', function () {
        updatePostDisplay([]);
      })

    nodeBrush
      .on('end', function (event) {
        if (!event.selection) {
          updatePostDisplay([]);
          return;
        }
        let brushedArea = event.selection
        let posts = uniqueNodes.filter(d => {
          let coords = projection([d.longitude, d.latitude]);
          return isBrushed(brushedArea, coords[0], coords[1]);
        })
        updatePostDisplay(posts);
      })
  }, [updatePostDisplay, innerWidth, innerHeight, projection]);

  function isBrushed(brush_coords, cx, cy) {
    if (brush_coords) {
      let x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }
  }
  ////////////////////////////////////


  ////////////////////////////////////
  // Zoom
  // const zoomRef = useRef();
  // useEffect(() => {
  //   const zoomHandler = d3.zoom()
  //     .on("zoom", (e) => {
  //       d3.select(zoomRef.current).attr("transform", e.transform);
  //     });
  //   // zoomHandler
  //   //   .on("dblclick.zoom", null);
  // }, []);
  ////////////////////////////////////

  // Handler for click events on devices
  function node_click(event) {
    let d = uniqueNodes.find(d => d.postID === Number(event.target.id));
    updatePostDisplay([d]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "90%", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Display Predicted Price
        {predictedPrice && (
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
            The predicted price for a {values.year}, {values.make} would be around ${predictedPrice}.So anything around this value could be considered reliable. If it is lower than this price make sure it has a "clean" title
          </p>
        )} */}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <h2>Map</h2>
          <button
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              backgroundColor: "#06273b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/")} // Navigate to home page using window.location
          >
            Close
          </button>
        </div>
        <Card>
          <ChartContainer
            width={width}
            height={height}
            margin={margin}
          >
            {actions.map((action, i) => (
              <image
                key={action.value}
                x={-margin.left + 10}
                y={10 + i * 35}
                className="interaction"
                opacity={props.selectedAction === action.value ? 1 : 0.6}
                heigth={25}
                width={25}
                href={ActionIcons(action.value)}
                onClick={() => props.onSelectedAction(action.value)}
              >
              </image>
            ))}
            {states.map((state, i) => (
              <g key={`curve-${state.id}`}>
                <path
                  d={geoPathGenerator(state)}
                  fill="#f8fcff"
                  stroke="#09131b"
                  strokeOpacity={0.4}
                />
              </g>
            ))}
            <path
              d={geoPathGenerator(borders)}
              fill="none"
              stroke="#09131b"
              strokeOpacity={0.4}
            />
            {uniqueNodes.map((node, i) => (
              <Circle
                key={`circle-${node.postID}`}
                id={node.postID}
                cx={projection([node.longitude, node.latitude])[0]}
                cy={projection([node.longitude, node.latitude])[1]}
                r={radiusScale(node.similarity_score)}
                fill={colorScale(node.similarity_score.toFixed(2))}
                stroke="#000"
                strokeWidth={0.5}
                onClick={props.selectedAction === "cursor" ? node_click : null}
              />
            ))}
            {props.selectedAction === "brush" && <g className="brush" ref={brushRef} />}
            {/* {props.selectedAction === "cursor" && <g className="zoom" ref={zoomRef} />} */}
            <g transform={`translate(${innerWidth - 50}, ${innerHeight - 100})`} ref={legendRef} />
          </ChartContainer>
        </Card>
      </div>
    </div>
  );
}
