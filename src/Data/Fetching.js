import { useState, useEffect } from 'react';
// import { fetchQstsData } from './https';
import useFetch from './useFetch';
// import Charts from '../Charts/Charts';
import Error from '../UI/Error/Error';
import { fetchData } from './https';
import * as d3 from 'd3';

export default function Fetching() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

   useEffect(() => {
    // const dataURL = "https://github.gatech.edu/pages/jfernandez87/CSE6242DAV/cars_east0_4.csv";
    const dataURL = "https://jorgelfer.github.io/CSE6242DAV/cars_east0_4.csv";
    
    let mounted = true;
    d3.csv(dataURL).then(data => {
      console.log("data", data);

      if (mounted) {
        setData(data);
        setLoading(false);
      }
    });

    return () => mounted = false;
  }, []); 

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {/* {!loading && <>
        <Charts data={data} />
      </>} */}
    </>
  );
};