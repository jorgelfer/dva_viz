import classes from './ChartContainer.module.css';

export default function ChartContainer(props) {
  return (
    <svg className={classes.container} viewBox={`0 0 ${props.width} ${props.height}`}>
      <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
        {props.children}
      </g>
    </svg>
  );
};
