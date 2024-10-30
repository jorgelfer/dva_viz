import classes from './Post.module.css';

// fill is a utility function that will fill width and height user provided images
export default function MealItem({ model, price, year, ...props }) {
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
            <button>details</button>
        </div>
      </div>
    </article>
  );
}