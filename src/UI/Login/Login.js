import classes from './Login.module.css';

export default function Login({values, onSubmitted, onEnteredValues}) {

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
          <label htmlFor="text">Make</label>
          <select 
            type="text" 
            id="make" 
            name="make"
            onChange={(event) => onEnteredValues('make', event.target.value)}
          >
            <option value="Toyota">Toyota</option>
            <option value="Nissan">Nissan</option>
            <option value="Honda">Honda</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="text">Color</label>
          <select 
            type="text" 
            id="color" 
            name="color"
            onChange={(event) => onEnteredValues('color', event.target.value)}
          >
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="White">White</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="number">Price Range</label>
          <select 
            type="number" 
            id="price" 
            name="price"
            onChange={(event) => onEnteredValues('price', event.target.value)}
          >
            <option value={5000}>0 - $5,000</option>
            <option value={10000}>$5,000 - $10,000</option>
            <option value={20000}>$10,000 - $20,000</option>
          </select>
        </div>

      </div>

      <div className={classes["control-row"]}>
        <div className={classes.control}>
          <label htmlFor="text">State</label>
          <select 
            type="text" 
            id="state" 
            name="state"
            onChange={(event) => onEnteredValues('state', event.target.value)}
          >
            <option value="Georgia">GA</option>
            <option value="Florida">FL</option>
            <option value="Tennesse">TN</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="text">Transmission</label>
          <select 
            type="text" 
            id="type" 
            name="type"
            onChange={(event) => onEnteredValues('type', event.target.value)}
          >
            <option value="SUV">SUV</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="number">Year</label>
          <select 
            type="number" 
            id="year" 
            name="year"
            onChange={(event) => onEnteredValues('year', event.target.value)}
          >
            <option value="2000">2000 or earlier</option>
            <option value="2010">2001 - 2010</option>
            <option value="2020">2011 - 2020</option>
            <option value="2024">2020 or later</option>
          </select>
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
