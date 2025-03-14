import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get('/products');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProducts = products.filter(product => {
    return (!filters.category || product.category === filters.category) &&
           (!filters.minPrice || product.price >= Number(filters.minPrice)) &&
           (!filters.maxPrice || product.price <= Number(filters.maxPrice));
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="product-list-container">
      <div className="filters">
        <select 
          name="category" 
          value={filters.category} 
          onChange={handleFilterChange}
        >
          <option value="">Toutes les catégories</option>
          <option value="electronics">Électronique</option>
          <option value="clothing">Vêtements</option>
          <option value="books">Livres</option>
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Prix min"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Prix max"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList; 