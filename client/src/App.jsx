import Header from "./Components/Header";
import Products from "./Components/Products";
import { useState } from "react";
function App() {
  const [cartCounter, setCartCounter] = useState(0);
  function addToCart() {
    setCartCounter(cartCounter + 1);
  }
  return (
    <>
      <Header/>
      <Products/>
    </>
  );
}

export default App;
