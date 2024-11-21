import { useState, useEffect } from 'react';
import Charts from '../Charts/Charts';
import { fetchCarsData } from './https';
import useFetch from './useFetch';
import * as d3 from 'd3';

export default function Fetching({values}) {

  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  //  useEffect(() => {
  //   const dataURL = "https://jorgelfer.github.io/CSE6242DAV/cars_east0_4.csv";
    
  //   let mounted = true;
  //   d3.csv(dataURL).then(data => {
  //     // console.log("data", data);

  //     if (mounted) {
  //       setData(data);
  //       setLoading(false);
  //     }
  //   });

  //   return () => mounted = false;
  // }, []); 

  const carsURL = `http://127.0.0.1:5000/api/recommend/${values.make}/${values.color}/${values.type}/${values.price}/${values.year}`;
  // console.log(carsURL);
  const {loading, data, error} = useFetch(fetchCarsData, carsURL);
  // console.log("data", data);

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {!loading && <>
        <Charts data={data} />
      </>}
    </>
  );
};