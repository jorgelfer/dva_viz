import React, { useState } from "react";
import classes from './Details.module.css';

export default function Details({ post, onClosePost }) {
  const imageNames = Array.isArray(post.pics) ? post.pics : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageNames.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageNames.length) % imageNames.length);
  };

  return (
    <div className={classes.post}>
      <header className={classes.headerText}>
        <div className={classes["control-row"]}>
          <h1 className={classes["header-h1"]}>{post.model}</h1>
          <button
            className={classes["login-button"]}
            onClick={() => onClosePost(null)}
          >
            Close
          </button>
        </div>
      </header>
      <div className={classes.details}>
        <p><strong>Post id:</strong> {post.postID}</p>
        <p><strong>Price:</strong> {post.price}</p>
        <p><strong>Year:</strong> {post["make year"]}</p>
        <p><strong>Color:</strong> {post["color"]}</p>
        <p><strong>Condition:</strong> {post["condition"]}</p>
        <p><strong>Cylinder #:</strong> {post["cylinder NO"]}</p>
        <p><strong>Drive:</strong> {post["drive"]}</p>
        <p><strong>Fuel:</strong> {post["fuel"]}</p>
        <p><strong>Status:</strong> {post["status"]}</p>
        <p><strong>Transmission:</strong> {post["transmission"]}</p>
        <p><strong>Vehicle type:</strong> {post["vehicle type"]}</p>
        <p>
          <strong>Listing:</strong> 
          <a href={post["url"]} target="_blank" rel="noopener noreferrer">{post["url"]}</a>
        </p>
      </div>
      {imageNames.length > 0 ? (
        <div className={classes.carousel}>
          <button onClick={handlePrevious} className={classes.navButton}>❮</button>
          <img
            src={imageNames[currentIndex]} // Direct URL provided for backend
            alt={`Image ${currentIndex + 1}`}
            className={classes.image}
          />
          <button onClick={handleNext} className={classes.navButton}>❯</button>
        </div>
      ) : (
        <p>No images available for this listing.</p>
      )}
    </div>
  );
}
