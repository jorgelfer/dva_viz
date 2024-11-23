import { useState } from "react";
import Login from './UI/Login/Login';
import Fetching from './Data/Fetching'

function App() {
  const [isCaseSubmitted, setCaseSubmitted] = useState(false);
  function handleSubmitted() {
    setCaseSubmitted((curIsCaseSubmitted) => !curIsCaseSubmitted);
  }

  const [enteredValues, setEnteredValues] = useState({
    make: "toyota",
    color: "white",
    type: "SUV",
    price: "15000",
    state: "GA",
    year: "2012"
  });

  function handleInputChange(identifier, value) {
    setEnteredValues(prevCase => ({
      ...prevCase,
      [identifier]: value
    }))
  }

  return (
    <>
      {!isCaseSubmitted && <main>
        <Login
          values={enteredValues}
          onSubmitted={handleSubmitted}
          onEnteredValues={handleInputChange}
        />
      </main>}
      {isCaseSubmitted && <div className="container">
        <Fetching
          values={enteredValues}
        />
      </div>}
    </>
  );
}

export default App;
