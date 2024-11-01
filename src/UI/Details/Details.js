import classes from './Details.module.css';
export default function Details({post}) {

  console.log(post)

  return(
    <div className={classes.post}>
      <header className={classes.headerText}>
        <div className={classes["control-row"]}>
          <h1 className={classes["header-h1"]}>
              {post.model}
          </h1>
          <button className={classes["login-button"]}>
            Close
          </button>
        </div>
        <p>{post.price}</p>
        <p>{post["make year"]}</p>
      </header>
      <p>{post.title}</p>
      <p>{post.price}</p>
    </div>
  )
}