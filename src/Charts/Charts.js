import React from "react";
import MapGraph from './MapGraph';

export default function Charts(props) {

  const margin = {top: 30, right: 30, bottom: 50, left: 70};

  return (
    <>
      <h1>Craiglist used car search</h1>
      <div>
        <MapGraph 
          margin={margin} 
          data={props.data} 
        />
      </div>
    </>
  )
};
