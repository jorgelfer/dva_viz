import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { geoAlbersUsa, geoPath} from "d3-geo";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import * as topojson from "topojson-client";
import usa from "./states-10m.json";


export default function MapGeojson(props) {

  const nodeSize = 2;

  // main
  const mapRef = useRef();
  useEffect(() => {
    const mapContainer = d3.select(mapRef.current);

    let states = topojson.feature(usa, usa.objects.states).features;
    let borders = topojson.mesh(usa, usa.objects.states);

    // Append geojson map
    const projection = geoAlbersUsa()
      .translate([props.width/2, props.height/2])
      .fitExtent([[0, 0], [props.width, props.height]], borders);

    const geoPathGenerator = geoPath()
        .projection(projection); 

    var path_group = mapContainer.append("g")
      .attr("class", "usa")
      .lower();

    // Append the states paths
    path_group 
      .selectAll(".state")
      .data(states)
      .join("path")
          .attr("class", "state")
          .attr("d", d => geoPathGenerator(d))
          .attr("fill", "#f8fcff");

    // Append the borders path
    path_group
      .append("path")
        .attr("class", "states-borders")
        .attr("d", geoPathGenerator(borders))
        .attr("fill", "none")
        .attr("stroke", "#09131b")
        .attr("stroke-opacity", 0.4);

    var nodeEnter = mapContainer
      .selectAll(".node")
      .data(props.data)
      .join("g")
        .attr("class", "node")
        .attr('transform', function(d) { 
          let coords = projection([d.longitude, d.latitude]);
          return coords && `translate(${coords})`;
         });

    // Append circles for each node in the graph
    nodeEnter
      .append('circle')
        .attr('class', 'circle')
        .attr("r", nodeSize)
        .style('fill', "red")
        .raise();
 
    // Handle zoom
    // const zoomHandler = zoom()
    //   .on("zoom", (e) => {
    //     mapContainer.attr("transform", e.transform);
    //   });
    
    // select(".container")
    //   .call(zoomHandler)
    //   .on("dblclick.zoom", null);

  }, [props, nodeSize]);

  return ( 
    <g 
    ref={mapRef}
    />
  );    
}