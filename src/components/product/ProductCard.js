import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.price}€</p>
        <p className="description">{product.description}</p>
        <div className="actions">
          <Link to={`/product/${product.id}`} className="details-button">
            Voir détails
          </Link>
          <button onClick={() => addToCart(product)} className="add-to-cart">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 