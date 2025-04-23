import React from 'react';

const ProductItem = ({ id, name, price, category, stock, onDelete }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{price} VND</td>
      <td>{category}</td>
      <td>{stock}</td>
      <td>
        <button onClick={() => onDelete(id)}>Xoá</button>
      </td>
    </tr>
  );
};

export default ProductItem;