import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">E-Sales</Link>
      <div className="nav-links">
        <Link to="/">Produits</Link>
        <Link to="/cart" className="cart-link">
          Panier ({cart.items.length})
        </Link>
        {user ? (
          <>
            <span>Bonjour, {user.name}</span>
            <button onClick={logout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 