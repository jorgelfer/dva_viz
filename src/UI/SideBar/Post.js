import classes from './Post.module.css';

// fill is a utility function that will fill width and height user provided images
export default function Post({ post, onSelectPost, selectedPost }) {
  let buttonClass = (selectedPost !== null) && (selectedPost.postID === post.postID) ? classes["selected-button"] : classes["details-button"];
  return (
    <article className={classes.post}>
      <header>
        <div className={classes.headerText}>
          <h2>{post.model}</h2>
          <p>score {post.similarity_score.toFixed(2)}</p>
          <p>price {post.price}</p>
          <p>year {post["make year"]}</p>
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes.actions}>
            <button 
              className={buttonClass}
              onClick={() => onSelectPost(post)}
            >details</button>
        </div>
      </div>
    </article>
  );
}