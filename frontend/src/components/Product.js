import React from 'react';
import './Product.css';

function Product({header, image, price, addToCart}) {
  return (
    <div className="Product">
      <img src={image} />
      <h1>{header}</h1>
      <p>{` ${price} руб. `}</p>
      <button onClick={addToCart}>В корзину</button>
    </div>
  );
}

export default Product;