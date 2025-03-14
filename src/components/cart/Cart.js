import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return <div className="empty-cart">Votre panier est vide</div>;
  }

  return (
    <div className="cart-container">
      <h2>Votre Panier</h2>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.price}€</p>
            </div>
            <button onClick={() => removeFromCart(item)} className="remove-button">
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total: {cart.total}€</p>
        <button onClick={handleCheckout} className="checkout-button">
          Procéder au paiement
        </button>
      </div>
    </div>
  );
};

export default Cart; 