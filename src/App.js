import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/layout/Navbar';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import Cart from './components/cart/Cart';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Checkout from './components/checkout/Checkout';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route path="/product/:id" component={ProductDetail} />
              <Route path="/cart" component={Cart} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/checkout" component={Checkout} />
            </Switch>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
