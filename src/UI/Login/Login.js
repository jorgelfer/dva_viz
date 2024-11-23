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
            <option value="toyota">Toyota</option>
            <option value="ford">Ford</option>
            <option value="honda">Honda</option>
            <option value="nissan">Nissan</option>            
            <option value="bmw">BMW</option>
            <option value="audi">Audi</option>
            <option value="kia">Kia</option>
            {/* <option value="volvo">Volvo</option> 
            <option value="volkswagen">volkswagen</option>              */}
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="text">Color</label>
          <select 
            type="text" 
            id="color" 
            name="color"
            value={values.color}
            onChange={(event) => onEnteredValues('color', event.target.value)}
          >
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="grey">Grey</option>
            <option value="green">Green</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="number">Price</label>
          <select 
            type="number" 
            id="price" 
            name="price"
            value={values.price}
            onChange={(event) => onEnteredValues('price', event.target.value)}
          >
            <option value={5000}>under $5,000</option>
            <option value={10000}>under $10,000</option>
            <option value={15000}>under $15,000</option>
            <option value={20000}>under $20,000</option>
            <option value={25000}>under $25,000</option>
            <option value={30000}>under $30,000</option>
            <option value={35000}>under $35,000</option>
            <option value={40000}>under $40,000</option>
            <option value={45000}>under $45,000</option>
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
            <option value="FA">GA</option>
            <option value="FL">FL</option>
            <option value="TN">TN</option>
            <option value="SC">SC</option>
            <option value="AL">AL</option>
            <option value="CL">CL</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="text">Type</label>
          <select 
            type="text" 
            id="type" 
            name="type"
            onChange={(event) => onEnteredValues('type', event.target.value)}
          >
            <option value="SUV">SUV</option>
            <option value="sedan">Sedan</option>
            <option value="pickup">Pickup</option>
            <option value="hatchback">Hatchback</option>
            <option value="coupe">Coupe</option>
            <option value="convertible">Covertible</option>
          </select>
        </div>

        <div className={classes.control}>
        <label htmlFor="number">POST-YEAR</label>
        <select
          id="year"
          name="year"
          value={values.year}
          onChange={(event) => onEnteredValues('year', event.target.value)}
        >
          {Array.from({ length: 2024 - 2000 + 1 }, (_, i) => 2000 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
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
