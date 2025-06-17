import { useMutation } from 'urql';
import cart from '../../assets/cart.png';

import './cart.css';
import { CREATE_ORDER } from '../../query/Order.mutation';

const CartComponent = ({ 
  toggleMenu,
  menuVisible,
  itemCount,
  cartItems,
  renderColorAttribute,
  renderAttributes,
  totalPrice,
  message,
  setMessage
}) => {
  const [createOrderResult, createOrder] = useMutation(CREATE_ORDER);

  const increaseQty = (cartItem) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === cartItem.id && JSON.stringify(item.attributes) === JSON.stringify(cartItem.attributes)) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const decreaseQty = (cartItem) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === cartItem.id && JSON.stringify(item.attributes) === JSON.stringify(cartItem.attributes)) {
        return { ...item, quantity:  item.quantity - 1};
      }
      return item;
    }).filter(item => item.quantity > 0);;
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const placeOrder = async(e) => {
    e.stopPropagation();
    toggleMenu()
    const order = cartItems.map((item) => formatingOrderObject(item));
    const result = await createOrder({ orders: order });

    if (result.error) {
      console.error('Error creating order:', result.error);
    } else {
      setMessage('Successfully order placing');
      localStorage.setItem('cart', JSON.stringify([]));
      window.dispatchEvent(new Event('cartUpdated'));
    }
    
    setTimeout(() => setMessage(''), 3000);
  }

  const formatingOrderObject = (cartItem) => {
    const attributeArray = Object.entries(cartItem.attributes).map(([key, value]) => ({
      key,
      value,
    }));
    
    return {
      product_id: cartItem.id,
      unit_price: cartItem.price,
      quantity: cartItem.quantity,
      attributes: attributeArray,
    };
  }
  
  return (
    <div className="nav-cart-wrapper">
      <button className="nav-cart-button" onClick={toggleMenu} data-testid='cart-btn'>
        <img src={cart} alt="Cart" className="nav-cart-icon" style={{ width: "144px", height: "40px" }}/>
        {itemCount > 0 && <span className="nav-cart-count">{ itemCount }</span>}
      </button>

      {message && (
        <div className='alert alert-success' style={{ marginTop: '10px', color: 'green' }}>
          {message}
        </div>
      )}


      {menuVisible && (
        <>
        <div className="cart-backdrop" onClick={toggleMenu}></div>
        <div className="nav-cart-overlay" data-testid='cart-overlay'>
          <h4><strong>My Bag</strong>, {itemCount} {itemCount === 1 ? 'Item' : 'Items'}</h4>
          {
            cartItems.map((item, index) => (
              <div key={index} data-testid='cart-item'>
                <div className='row' style={{display: 'flex', verticalAlign:'middle'}}>
                  <div className='col-sm-6'>
                    <strong>{ item.name }</strong>
                    <h4>${ item.price.toFixed(2) }</h4>
                    <div>
                      {item.productAttributes.map(attribute => {
                        if(attribute.name === 'Color') {
                          return renderColorAttribute(item, attribute);
                        } else {
                          return renderAttributes(item, attribute);
                        }
                      })}
                    </div>
                  </div>

                  <div className='col-sm-6' style={{ display: 'flex' }}>
                    <div className='row'>
                      <div className="col-sm-4 quantity-control text-center">
                        <button 
                          className="btn btn-default quantity-btn"
                          onClick={() => increaseQty(item)}
                          data-testid='cart-item-amount-increase'
                        >
                          +
                        </button>
                        <div 
                          className="quantity-number"
                          data-testid='cart-item-amount'
                        >
                          {item.quantity}
                        </div>
                        <button 
                          className="btn btn-default quantity-btn" 
                          onClick={() => decreaseQty(item)}
                          data-testid='cart-item-amount-decrease'
                        >
                          −
                        </button>
                      </div>
                      <div className='col-sm-8'>
                        <img src={item.image} style={{ maxWidth: '90px', height:'auto'}} />
                      </div>
                    </div>
                  </div>
                </div>

                <hr style={{ borderTop: '1px solid #ccc', margin: '15px 0', height: '0px' }} />
              </div>
              
            ))
          }

          <h4 data-testid='cart-total'>Total: ${totalPrice.toFixed(2)}</h4>

          <button 
            type="button"
            class="btn btn-success btn-lg btn-block"
            disabled={ cartItems.length === 0 }
            style={cartItems.length === 0 ? {background: 'grey'} : {}}
            onClick={ placeOrder }
          >
            PLACE ORDER
          </button>
        </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
