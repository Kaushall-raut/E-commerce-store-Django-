import { NavBar } from "./components/NavBar";
import PrivateRouter from "./components/PrivateRouter";
import CartPage from "./pages/CartPage";
import { CheckoutPage } from "./pages/checkoutPage";
import { Login } from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />

        <Route element={<PrivateRouter />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};
export default App;
