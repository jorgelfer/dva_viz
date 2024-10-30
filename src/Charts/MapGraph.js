import Card from '../UI/Card/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import GeojsonMap from '../ChartComponents/GeojsonMap';
import usaMap from "../ChartComponents/us-states.json";

export default function MapGraph({margin, data, updatePostDisplay}) {
  const width = 700;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return(
    <Card>
      <h2>Map</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={margin}
        >
        <GeojsonMap
          width={innerWidth}
          height={innerHeight}
          geo_data={usaMap}
          data={data}
          updatePostDisplay={updatePostDisplay}
        />
      </ChartContainer>
    </Card>
  );
}