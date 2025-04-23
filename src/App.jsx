import React, { useState } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm A', price: 100000, category: 'Thời trang', stock: 10 },
    { id: 2, name: 'Sản phẩm B', price: 200000, category: 'Công nghệ', stock: 5 },
    { id: 3, name: 'Sản phẩm C', price: 150000, category: 'Gia dụng', stock: 8 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Calculate totals
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  return (
    <div className="app-container">
      <h1>Quản lý sản phẩm</h1>
      <div className="totals-container">
        <p>Tổng sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}</p>
      </div>
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
      <div className="filter-container">
        <label htmlFor="category-filter">Lọc theo danh mục:</label>
        <select id="category-filter" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Tất cả</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Công nghệ">Công nghệ</option>
          <option value="Gia dụng">Gia dụng</option>
        </select>
      </div>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <ProductList products={filteredProducts} onDelete={handleDelete} />
    </div>
  );
};

export default App;