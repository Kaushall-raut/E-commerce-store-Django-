import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) =>
        console.error("Error while fetching data from backend", error),
      );
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <div id={product.id}>
            <li>{product.name}</li>
            <li>{product.price}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
