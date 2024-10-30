import classes from "./PostSidebar.module.css"
import Post from "./Post"; 
export default function PostSidebar({posts}) {
  return (
    <aside className={classes.sideBar}>
       <h2 className={classes["sideBar-text"]}> Posts</h2> 
       <ul className={classes.posts}>
        {posts.map(post => <li key={post.postID}>
          <Post {...post} />
          </li>)};
       </ul>
    </aside>
  );
}