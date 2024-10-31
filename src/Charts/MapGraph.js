import Card from '../UI/Card/Card';
import ChartContainer from '../ChartComponents/ChartContainer';

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { geoAlbersUsa, geoPath} from "d3-geo";
import * as topojson from "topojson-client";
import usa from "../Data/states-10m.json";
import Circle from '../ChartComponents/Circle';

export default function MapGraph({margin, data, updatePostDisplay}) {
  const width = 700;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let states = topojson.feature(usa, usa.objects.states).features;
  let borders = topojson.mesh(usa, usa.objects.states);

  // Append geojson map
  const projection = geoAlbersUsa()
    .translate([innerWidth/2, innerHeight/2])
    .fitExtent([[0, 0], [innerWidth, innerHeight]], borders);

  const geoPathGenerator = geoPath()
      .projection(projection); 
  
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
        // console.log('event::: ', event);
        // console.log('event.selection::: ', event.selection);
        if (!event.selection) {
          updatePostDisplay([]);
          return;
        }
        let brushedArea = event.selection
        let posts = uniqueNodes.filter(d => {
          let coords = projection([d.longitude, d.latitude]);
          return isBrushed(brushedArea, coords[0], coords[1]);
        }) 
        // console.log(posts)
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

  return(
    <Card>
      <h2>Map</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={margin}
        >
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
            key={`circle-${i}-${node.postID}`}
            cx={projection([node.longitude, node.latitude])[0]}
            cy={projection([node.longitude, node.latitude])[1]}
            r={2}
            fill="#f00"
            stroke="#000"
            strokeWidth={0.5}
          />
        ))}
        <g className="brush" ref={brushRef} />
      </ChartContainer>
    </Card>
  );
}