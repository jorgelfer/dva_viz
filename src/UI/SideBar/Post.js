import classes from './Post.module.css';

// fill is a utility function that will fill width and height user provided images
export default function Post({ model, price, ...props }) {
  return (
    <article className={classes.post}>
      <header>
        <div className={classes.headerText}>
          <h2>{model}</h2>
          <p>price {price}</p>
          <p>year {props["make year"]}</p>
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes.actions}>
            <button className={classes["details-button"]}>details</button>
        </div>
      </div>
    </article>
  );
}