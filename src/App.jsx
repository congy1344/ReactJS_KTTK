import React, { useState } from 'react';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm A', price: 100000, category: 'Danh mục 1', stock: 10 },
    { id: 2, name: 'Sản phẩm B', price: 200000, category: 'Danh mục 2', stock: 5 },
    { id: 3, name: 'Sản phẩm C', price: 150000, category: 'Danh mục 3', stock: 8 },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
};

export default App;