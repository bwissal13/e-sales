import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { api } from '../../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!product) return <div>Produit non trouvé</div>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="product-detail-container">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info-container">
        <h1>{product.name}</h1>
        <p className="price">{product.price}€</p>
        <p className="description">{product.description}</p>
        <div className="quantity-selector">
          <label htmlFor="quantity">Quantité:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductDetail; 