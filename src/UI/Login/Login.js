import classes from './Login.module.css';

export default function Login({onSubmitted}) {

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitted();
  }

  return (
    <form name="login_form" onSubmit={handleSubmit}>
      <h2 className={classes["login-header"]}>Welcome car hunters!</h2>
      <p className={classes["login-header"]}>We just need some information to get started 🚘 </p>

      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className={classes["control-row"]}>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className={classes.control}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className={classes["control-row"]}>
        <div className={classes.control}>
          <label htmlFor="make">Make</label>
          <input type="text" id="make" name="make" />
        </div>

        <div className={classes.control}>
          <label htmlFor="color">Color</label>
          <input type="text" id="color" name="color" />
        </div>
      </div>

      <div className={classes["control-row"]}>
        <div className={classes.control}>
          <label htmlFor="phone">Price Range</label>
          <select id="price" name="price">
            <option value="student">0 - $5,000</option>
            <option value="teacher">$5,000 - $10,000</option>
            <option value="employee">$10,000 - $20,000</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" />
        </div>
      </div>

      <div className={classes.control}>
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>
      <p className={classes["form-actions"]}>
        <button type="reset" className={classes["button-flat"]}>Reset</button>
        <button className={classes["login-button"]}>Search</button>
      </p>
    </form>
  );
}
