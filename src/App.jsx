import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

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

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Quản lý sản phẩm</h1>
      <div className="row mb-4">
        <div className="col text-center">
          <p className="fw-bold">Tổng sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}</p>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="card-title">Thêm sản phẩm</h5>
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              placeholder="Tên sản phẩm"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              className="form-control mb-2"
              placeholder="Giá"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              className="form-control mb-2"
              placeholder="Danh mục"
              value={newProduct.category}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="stock"
              className="form-control mb-2"
              placeholder="Tồn kho"
              value={newProduct.stock}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary w-100" onClick={handleAddProduct}>
              Thêm sản phẩm
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="card-title">Lọc sản phẩm</h5>
            <label htmlFor="category-filter" className="form-label">Lọc theo danh mục:</label>
            <select
              id="category-filter"
              className="form-select mb-2"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Tất cả</option>
              <option value="Thời trang">Thời trang</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Gia dụng">Gia dụng</option>
            </select>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>
        </div>
      </div>
      <div className="row">
        <ProductList products={filteredProducts} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;