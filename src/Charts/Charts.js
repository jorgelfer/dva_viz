import { useState, useCallback } from "react";
import MapGraph from './MapGraph';
import PostSidebar from '../UI/SideBar/PostSidebar';

export default function Charts(props) {
  const [selectedPosts, setSelectedPosts] = useState({
    selectedPost: undefined,
    posts: []
  });
  const margin = {top: 30, right: 30, bottom: 50, left: 70};

  const updatePostDisplay = useCallback((posts) => {
    // console.log(posts)
    setSelectedPosts((prevState) =>{
      return {
        ...prevState,
        selectedPost: null,
        posts: posts
      }
    });
  }, []);
  console.log(selectedPosts.posts)

  return (
    <>
      <div className="wrapper">
        <div className="main-header">
          <h2>Craiglist used car search</h2>
        </div>
        <div className="page">
          <PostSidebar posts={selectedPosts.posts}/>
          <div className="content">
            <MapGraph 
              margin={margin} 
              data={props.data} 
              updatePostDisplay={updatePostDisplay}
            />
          </div>
        </div>
      </div>
    </>
  )
};
