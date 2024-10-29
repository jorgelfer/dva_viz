import React from "react";
import MapGraph from './MapGraph';
import PostSidebar from '../UI/SideBar/PostSidebar';

export default function Charts(props) {
  const margin = {top: 30, right: 30, bottom: 50, left: 70};

  return (
    <>
      <div className="wrapper">
        <div className="main-header">
          <h2>Craiglist used car search</h2>
        </div>
        <div className="page">
          <PostSidebar />
          <div className="content">
            <MapGraph 
              margin={margin} 
              data={props.data} 
            />
          </div>
        </div>
      </div>
    </>
  )
};
