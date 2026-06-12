import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/store")
      .then((response) => response.json())
      .then((data) => {
        setData(data.message);
        console.log(data);
      })
      .catch((error) =>
        console.error("Error while fetching data from backend", error),
      );
  }, []);

  return <h1>{data}</h1>;
}

export default App;
