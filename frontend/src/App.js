import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ModalBox from './components/ModalBox';
import Login from './components/Login';
import Registration from './components/Registration';
import Basket from './views/Basket';
import Main from './views/Main';
import Cabinet from './views/Cabinet';

function App() {

  
  const [page, setPage] = useState('Main');
  const [modalBox, setModalBox] = useState('none');
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'))

  const modalBoxes = {
    none: null,
    Login: <ModalBox setModalBox={setModalBox}><Login setToken={setToken} /></ModalBox>,
    Registration: <ModalBox setModalBox={setModalBox}><Registration /></ModalBox>
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter(item => item._id !== product._id);
    setCart(updatedCart);
  };

  return (
    <div className="App">
      <Header setPage={setPage} setModalBox={setModalBox}  token={token} setToken={setToken} />
      {modalBoxes[modalBox]}
      {page === 'Main' && <Main addToCart={addToCart} />}
      {page === 'Basket' && <Basket cart={cart} removeFromCart={removeFromCart} />}
      {page === 'Cabinet' && <Cabinet  token={token} />}
      <Footer />
    </div>
  );
}

export default App;
