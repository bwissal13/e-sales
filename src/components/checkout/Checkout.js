import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const order = {
        items: cart.items,
        total: cart.total,
        shipping: shippingInfo,
        userId: user.id
      };
      await api.post('/orders', order);
      navigate('/confirmation');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="checkout-container">
      <h2>Finaliser la commande</h2>
      <div className="checkout-content">
        <div className="order-summary">
          <h3>Récapitulatif de la commande</h3>
          {cart.items.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name}</span>
              <span>{item.price}€</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Total:</strong>
            <span>{cart.total}€</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Adresse de livraison</h3>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              id="address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Code postal</label>
            <input
              type="text"
              id="postalCode"
              value={shippingInfo.postalCode}
              onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Pays</label>
            <input
              type="text"
              id="country"
              value={shippingInfo.country}
              onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Traitement...' : 'Confirmer la commande'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 