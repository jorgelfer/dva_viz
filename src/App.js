import { useState } from "react";
import Login from './UI/Login/Login';
import Fetching from './Data/Fetching'

function App() {
  const [isCaseSubmitted, setCaseSubmitted] = useState(false);
  function handleSubmitted() {
    setCaseSubmitted((curIsCaseSubmitted) => !curIsCaseSubmitted);
  }

  const [enteredValues, setEnteredValues] = useState({
    make: "Toyota",
    color: "Blue",
    price: "10000",
    state: "Georgia",
    type: "Automatic ",
    year: "2000"
  });

  function handleInputChange(identifier, value) {
    setEnteredValues(prevCase => ({
      ...prevCase,
      [identifier]: value
    }))
  }

  console.log(enteredValues);

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
        <Fetching/>
      </div>}
    </>
  );
}

export default App;
