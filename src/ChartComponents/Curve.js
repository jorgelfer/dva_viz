const Curve = props => {
  return (
    <path
      d={lineGenerator(props.data)}
      fill="none"
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
    />
  );
};

export default Curve;