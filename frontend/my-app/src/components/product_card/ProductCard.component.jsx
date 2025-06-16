import { useNavigate } from 'react-router-dom';
import './product_card.css';
import buy from '../../assets/buy.jpg';


const ProductCardComponent = ({ product, setCartVisible }) => {
  const navigate = useNavigate();

  const routeToProduct = () => {
    navigate('/product/' + product.id);
  }

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const selectedProduct = {
      id: product.id,
      name: product.name,
      image: product.gallery[0],
      price: product.product_price.amount,
      attributes: {},
      productAttributes: product.attributes
    };

    selectedProduct.attributes = product.attributes.reduce((accum, attribute) => {
      accum[attribute.name.toLowerCase()] = attribute.items[0].value;
      return accum;
    }, {});

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingIndex = cart.findIndex(item =>
      item.id === selectedProduct.id &&
      JSON.stringify(item.attributes) === JSON.stringify(selectedProduct.attributes)
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
    cart.push({
      ...selectedProduct,
      quantity: 1
    });
  }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated")); 
    setCartVisible(true);
  }

  return (
    <div className="product-card" onClick={routeToProduct} >
      <div className="panel-body">
        <div className='product-image-wrapper'>
        <img
          src={ product.gallery[0] }
          className="product-img"
          style={{
            filter: product.in_stock ? 'none' : 'grayscale(100%) opacity(0.5)',
          }}
          alt="Card Image"
          />
        { !product.in_stock && <div className="out-of-stock-overlay">OUT OF STOCK</div> }
        </div>
        <div className='product-content'>
          <h4>{ product.name }</h4>
          <strong>${product.product_price.amount.toFixed(2)}</strong>
        </div>

        {product.in_stock && <button className="cart-button" onClick={handleAddToCart}>
          <img src={buy} alt="Cart" className="cart-icon" />
        </button>}
      </div>
    </div>
  )
}

export default ProductCardComponent