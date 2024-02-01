import React, { useState } from 'react';
import './Basket.css';

function Basket({ cart, removeFromCart }) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    cardNumber: '',
    phoneNumber: '',
    address: '',
    email: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(false);
  };

  const placeOrder = () => {
    if (
      formData.name.trim() === '' ||
      formData.surname.trim() === '' ||
      formData.cardNumber.trim() === '' ||
      formData.phoneNumber.trim() === '' ||
      formData.address.trim() === '' ||
      formData.email.trim() === ''
    ) {
      alert('Пожалуйста, заполните все поля формы.');
      return;
    }
    setOrderPlaced(true);
  };

  const handleCheckoutClick = () => {
    handlePlaceOrder();
    placeOrder();
  };

  return (
    <div className="Basket">
      <h1>Корзина</h1>
      <ul>
        {cart.map(product => (
          <li key={product._id}>
            <img src={product.image} />
            <h3>{product.header}</h3>
            <p>{product.price} руб.</p>
            <button onClick={() => removeFromCart(product)}>Удалить</button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <div className="total">
          Общая сумма: {calculateTotal()} руб.
          <button id='zakaz' onClick={() => setShowCheckoutModal(true)}>Оформить заказ</button>
        </div>
      )}
      {showCheckoutModal && (
        <div className="checkout-modal show">
          {!orderPlaced ? (
            <>
              <h2>Введите данные для оформления заказа</h2>
              <form>
                  <input placeholder='Имя' type="text" name="name" value={formData.name} onChange={handleInputChange} />
                  <input type="text" name="surname" placeholder="Фамилия" value={formData.surname} onChange={handleInputChange} />
                  <input type="tel" name="cardNumber" placeholder="Номер карты" value={formData.cardNumber} onChange={handleInputChange}/>
                  <input type="tel" name="phoneNumber" placeholder="Номер телефона" value={formData.phoneNumber} onChange={handleInputChange}/>
                  <input type="text" name="address" placeholder="Адрес" value={formData.address} onChange={handleInputChange} />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                <button id='ofrm' type="button" onClick={handleCheckoutClick}>
                  Оформить заказ
                </button>
              </form>
            </>
          ) : (
            <p id='oformil'>Вы успешно оформили заказ!</p>
          )}
          <button id='cls' onClick={() => setShowCheckoutModal(false)}>X</button>
        </div>
      )}
    </div>
  );
}

export default Basket;
