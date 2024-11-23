import { useState, useEffect } from 'react';
import Charts from '../Charts/Charts';
import { fetchCarsData } from './https';
import useFetch from './useFetch';
import * as d3 from 'd3';

export default function Fetching({ values }) {
  const [predictedPrice, setPredictedPrice] = useState(null); // State to store predicted price
  const [predictLoading, setPredictLoading] = useState(true); // Loading state for predict API
  const [predictError, setPredictError] = useState(null); // Error state for predict API


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

  // Recommendation API URL
  const carsURL = `http://127.0.0.1:5000/api/recommend/${values.make}/${values.color}/${values.type}/${values.price}/${values.year}/${values.state}`;
  const { loading, data, error } = useFetch(fetchCarsData, carsURL);

  // Predict API URL
  const predictURL = `http://127.0.0.1:5000/api/predict/${values.make}/${values.color}/${values.type}/${values.year}`;

  // Fetch predicted price
  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setPredictLoading(true);
        const response = await fetch(predictURL);
        if (!response.ok) {
          throw new Error(`Predict API error: ${response.statusText}`);
        }
        const result = await response.json();
        setPredictedPrice(result.predicted_price);
      } catch (err) {
        setPredictError(err.message);
      } finally {
        setPredictLoading(false);
      }
    };

    fetchPrediction();
  }, [predictURL]);

  return (
    <>
      {loading && predictLoading && <div className="loading">Loading...</div>}
      {!loading && !predictLoading && (
        <>
          {/* Display predicted price */}
          {predictError && <p style={{ color: "red" }}>Prediction Error: {predictError}</p>}
          {!predictError && predictedPrice !== null && (
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
              The predicted price for a {values.year}, {values.make} is expected to be around ${predictedPrice}.<br></br>
              So anything around this value could be considered reliable. If it is lower than this price make sure it has a "clean" title and its not a scam.
            </p>
          )}

          {/* Display recommendation data */}
          <Charts data={data} />
        </>
      )}
    </>
  );
}
