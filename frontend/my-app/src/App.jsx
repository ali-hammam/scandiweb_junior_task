import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDisplayContainer from './components/product_display/ProductDisplayContainer';
import ProductListContainer from './components/product_list/ProductList.container';
import NavbarContainer from './components/Navbar/Navbar.container';
import './App.css';


function App() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [cartProducts, setCartProducts] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <div >
      <NavbarContainer setCartVisible = {setCartVisible} cartVisible={cartVisible} setCurrentCategory={setCurrentCategory}/>
      {cartVisible && <div className="page-overlay" />}

      <Routes>
        <Route path="/" element={
          <ProductListContainer
            currentCategory={ currentCategory }
            cartProducts={ cartProducts }
            setCartProducts = { setCartProducts }
            setCartVisible = { setCartVisible }
          />
        } />
        <Route path="/:category" element={
          <ProductListContainer
            currentCategory={ currentCategory }
            cartProducts={ cartProducts }
            setCartProducts = { setCartProducts }
            setCartVisible = { setCartVisible }
          />
        } />
        <Route path="/product/:productId" element={
          <ProductDisplayContainer 
            cartProducts={ cartProducts }
            setCartProducts = { setCartProducts }
            setCartVisible = { setCartVisible }
          />
        } />
      </Routes>
    </div>
  )
}

export default App
