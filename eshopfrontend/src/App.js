import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Cart from './pages/Cart';
import About from './pages/About';
// import Services from './pages/Services';
import Contacts from './pages/Contacts';
import Header from './components/Header';
import './styles/App.css';
import ProductForm from './pages/ProductForm';
import Faq from './pages/Faq';
import OrdersPage from './pages/OrdersPage';
import { useAuth0 } from '@auth0/auth0-react';
import Checkout from './pages/Checkout'
import { Container } from 'react-bootstrap';
import RecentOrders from './pages/RecentOrders';
// import SingleProduct from './pages/SingleProduct';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <div className="App">
        <Header />
          <Container>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/faq" element={<Faq />} />
            <Route exact path="/contacts" element={<Contacts />} />
            {/* <Route exact path="/singleProduct/:productId" element={<SingleProduct />} /> */}
            
            {isAuthenticated && (
              <>
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/add-product" element={<ProductForm/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route exact path="/orders" element={<OrdersPage />} />
                <Route exact path="/recentOrders" element={<RecentOrders />} />
              </>
            )}
          </Routes>
          </Container>
      </div>
    </Router>
  );
}

export default App;
