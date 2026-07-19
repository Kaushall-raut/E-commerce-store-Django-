import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route  path="/" element= {<ProductList/>}  />
        <Route  path="/product/:id" element= {<ProductDetail/>}  />

      </Routes>
    </Router>
  );
};
export default App;
