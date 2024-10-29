import { useState } from "react";
import Login from './UI/Login/Login';
import Fetching from './Data/Fetching'

function App() {
  const [isCaseSubmitted, setCaseSubmitted] = useState(false);

  function handleSubmitted() {
    setCaseSubmitted((curIsCaseSubmitted) => !curIsCaseSubmitted);
  }

  return (
    <>
      {!isCaseSubmitted && <main>
        <Login
          onSubmitted={handleSubmitted}
        />
      </main>}
      {isCaseSubmitted && <div className="container">
        <Fetching/>
      </div>}
    </>
  );
}

export default App;
