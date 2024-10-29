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
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className={classes.control}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className={classes.control}>
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend className={classes["login-header"]}>How did you find us?</legend>
        <div className={classes.control}>
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className={classes.control}>
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className={classes.control}>
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className={classes.control}>
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>
      <p className={classes["form-actions"]}>
        <button type="reset" className={classes["button-flat"]}>Reset</button>
        <button className={classes["login-button"]}>Run qsts</button>
      </p>
    </form>
  );
}
