import classes from './Post.module.css';

// fill is a utility function that will fill width and height user provided images
export default function Post({ postID, model, price, year, onSelectPost, selectedPostID }) {
  let buttonClass = (selectedPostID === postID) ? classes["selected-button"] : classes["details-button"];
  return (
    <article className={classes.post}>
      <header>
        <div className={classes.headerText}>
          <h2>{model}</h2>
          <p>price {price}</p>
          <p>year {year}</p>
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes.actions}>
            <button 
              className={buttonClass}
              onClick={() => onSelectPost(postID)}
            >details</button>
        </div>
      </div>
    </article>
  );
}