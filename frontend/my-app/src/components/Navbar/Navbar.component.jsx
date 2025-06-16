import { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import './navbar.css';
import { Link } from 'react-router-dom';
import CartContainer from '../cart/Cart.container';

const NavbarComponent = ({ categories, setCurrentCategory, setCartVisible, cartVisible }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);

    const handleStorageChange = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      setCartItems(savedCart);
    };
  
    window.addEventListener('cartUpdated', handleStorageChange);
  
    return () => {
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const setCategory = (category) => {
    setActiveCategory(category.name)
    setCurrentCategory(category.name)
  }

  return (
    <nav className="navbar container">
      <div className="navbar-inner">
        <ul className="nav navbar-nav" style={{ display:'block',left:'100px' }}>
          {
            categories['categories'].map(category => {
              return(
                <>
                  <li key={category.name} className={activeCategory === category.name ? "active" : ""} style={{ margin:'0px 10px' }}>
                    <Link 
                      to={"/" + category.name} onClick={ () => setCategory(category) }
                      data-testid={activeCategory === category.name ? 'active-category-link' : 'category-link'}
                    >
                      <strong>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</strong>
                    </Link>
                  </li>
                </>
              );
            })
          }
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <CartContainer cartVisible={cartVisible} setCartVisible={setCartVisible} cartItems={cartItems}/>
        </ul>

        <div style={{position: "absolute", left: "800px", transform: "translateX(-50%)", top: "24px"}}>
          <img src={logo} alt="Center" style={{ height: "40px;"}} />
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent;
