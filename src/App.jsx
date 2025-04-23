import React, { useState } from 'react';
import ProductList from './components/ProductList';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm A', price: 100000, category: 'Danh mục 1', stock: 10 },
    { id: 2, name: 'Sản phẩm B', price: 200000, category: 'Danh mục 2', stock: 5 },
    { id: 3, name: 'Sản phẩm C', price: 150000, category: 'Danh mục 3', stock: 8 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      alert('Vui lòng nhập đầy đủ thông tin sản phẩm!');
      return;
    }

    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { id: newId, ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock) }]);
    setNewProduct({ name: '', price: '', category: '', stock: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Quản lý sản phẩm</h1>
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Danh mục"
          value={newProduct.category}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Tồn kho"
          value={newProduct.stock}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProduct}>Thêm sản phẩm</button>
      </div>
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
};

export default App;