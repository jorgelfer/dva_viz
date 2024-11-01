import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';

import classes from "./PostSidebar.module.css"
import Post from "./Post"; 
export default function PostSidebar({posts, onSelectPost, selectedPost}) {

  const [pagination, setPagination] = useState({
    offset: 0,
    numberPerPage: 5,
    pageCount: 0,
    currentData: []
  });
  // sole.log(pagination.data)

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: Math.ceil(posts.length / prevState.numberPerPage),
      currentData: posts.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
    }))
  }, [posts, pagination.numberPerPage, pagination.offset])

  const handlePageClick = event => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage
    setPagination({ ...pagination, offset })
  }

  return (
    <aside className={classes.sideBar}>
      <h2 className={classes["sideBar-text"]}> Posts</h2> 
      <ul className={classes.posts}>
       {pagination.currentData && pagination.currentData.map(post => <li key={post.postID}>
         <Post 
            post={post}
            onSelectPost={onSelectPost}
            selectedPost={selectedPost}
         />
         </li>)};
      </ul>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </aside>
  );
}