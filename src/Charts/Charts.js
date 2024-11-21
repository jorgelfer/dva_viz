import { useState, useCallback } from "react";
import MapGraph from './MapGraph';
import PostSidebar from '../UI/SideBar/PostSidebar';
import Details from '../UI/Details/Details';

export default function Charts(props) {
  const [selectedPosts, setSelectedPosts] = useState({
    selectedPost: null,
    posts: []
  });
  const margin = {top: 30, right: 100, bottom: 50, left: 70};

  const updatePostDisplay = useCallback((posts) => {
    // console.log(posts)
    setSelectedPosts((prevState) =>{
      return {
        ...prevState,
        posts: posts
      }
    });
  }, []);

  function handlePostDisplay(post) {
    setSelectedPosts((prevState) => ({
      ...prevState,
      selectedPost: post,
    }));
  }

  // handle network interactions
  const [selectedAction, setSelectedAction] = useState('cursor');
  function handleSelectedAction(selectedIcon) {
    if (selectedAction !== selectedIcon) {
      setSelectedAction(selectedIcon);
    }
  }

  let content = <MapGraph
      margin={margin} 
      data={props.data} 
      updatePostDisplay={updatePostDisplay}
      selectedAction={selectedAction}
      onSelectedAction={handleSelectedAction}
    />
  if (selectedPosts.selectedPost !== null) {
    content = <Details 
      post={selectedPosts.selectedPost}
      onClosePost={handlePostDisplay}
      />;
  }

  return (
    <>
      <div className="wrapper">
        <div className="main-header">
          <h2>Craiglist used car search</h2>
        </div>
        <div className="page">
          <PostSidebar 
            posts={selectedPosts.posts}
            onSelectPost={handlePostDisplay}
            selectedPost={selectedPosts.selectedPost}
          />
          <div className="content">
            {content}
          </div>
        </div>
      </div>
    </>
  )
};
