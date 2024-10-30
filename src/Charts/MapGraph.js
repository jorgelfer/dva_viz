import Card from '../UI/Card/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import GeojsonMap from '../ChartComponents/GeojsonMap';

import * as d3 from "d3";
import { geoAlbersUsa, geoPath} from "d3-geo";
import * as topojson from "topojson-client";
import usa from "../ChartComponents/states-10m.json";
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
    
  // console.log(states);
  console.log(borders);

  // get unique nodes with coordinates
  let uniqueNodes = data.filter((v, i, a) => {
    let coords = projection([v.longitude, v.latitude]);
    return coords && a.findIndex(t => (t.postID === v.postID) === i);
  });

  return(
    <Card>
      <h2>Map</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={margin}
        >
        {/* <GeojsonMap
          width={innerWidth}
          height={innerHeight}
          geo_data={usaMap}
          data={data}
          updatePostDisplay={updatePostDisplay}
        /> */}
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
            cx={projection([node.longitude, node.latitude])[0]}
            cy={projection([node.longitude, node.latitude])[1]}
            r={2}
            fill="#f00"
            stroke="#000"
            strokeWidth={0.5}
          />
        ))}
      </ChartContainer>
    </Card>
  );
}