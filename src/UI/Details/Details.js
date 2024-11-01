import classes from './Details.module.css';
export default function Details({post, onClosePost}) {

  console.log(post)

  return(
    <div className={classes.post}>
      <header className={classes.headerText}>
        <div className={classes["control-row"]}>
          <h1 className={classes["header-h1"]}>
              {post.model}
          </h1>
          <button 
            className={classes["login-button"]}
            onClick={() => onClosePost(null)}
          >
            Close
          </button>
        </div>
      </header>
      <p><strong>Price:</strong> {post.price}</p>
      <p><strong>Year:</strong> {post["make year"]}</p>
      <p><strong>Color:</strong> {post["color"]}</p>
      <p><strong>Condition:</strong> {post["condition"]}</p>
      <p><strong>Cylinder #:</strong> {post["cylinder NO"]}</p>
      <p><strong>Drive:</strong> {post["drive"]}</p>
      <p><strong>Fuel:</strong> {post["fuel"]}</p>
      <p><strong>Status:</strong> {post["status"]}</p>
      <p><strong>Transmission:</strong> {post["transmission"]}</p>
      <p><strong>Vehicle type:</strong> {post["vehicle type"]}</p>
    </div>
  )
}