import CartComponent from './cart.component';

const CartContainer = ({ cartItems, setCartVisible, cartVisible }) => {  
  const toggleMenu = () => setCartVisible(!cartVisible);

  const countCartItems = () => cartItems.reduce((accum, item) => accum + item.quantity, 0);
  
  const countTotalPrice = () => cartItems.reduce((accum, item) => accum + (item.price * item.quantity), 0);

  const renderColorAttribute = (cartItem, attribute) => {
    return (
      <div>
        <strong>COLOR: </strong>
        <br/>
        {
          attribute.items.map(color => (
              <button
                key={color}
                className="btn"
                style={{
                  backgroundColor: color.value,
                  width: '10px',
                  height: '20px',
                  border: cartItem.attributes.color === color.value ? '2px solid black' : '1px solid #ccc',
                  marginRight: '3px'
                }}
              />
          ))
        }
      </div>
    );
  }

  const renderAttributes = (cartItem, attribute) => {
    const attributeName = attribute.name;
    return (
      <>
        {
          <div>
            <strong>{attributeName.toUpperCase()}:</strong>
            <div className="btn-group" style={{ width: '200px' }}>
            {attribute.items.map(item => (
              <label
                key={item.value}
                className={`btn btn-default ${cartItem.attributes[attributeName.toLowerCase()] === item.value ? 'active' : ''}`}
                >
                <input 
                  type="radio"
                  name={attribute.name} 
                  autoComplete="off" 
                  value={item.value}
                  checked={cartItem.attributes[attributeName.toLowerCase()] === item.value}
                  readOnly
                  style={{ display: 'none' }}
                  data-testid={cartItem.attributes[attributeName.toLowerCase()] === item.value ? '':''}
                  disabled
                />
                {item.value}
              </label>
            ))}
          </div>
        </div>
        }
      </>
    );
  }
  
  return (
    <>
      <CartComponent 
        toggleMenu={ toggleMenu }
        menuVisible={ cartVisible }
        itemCount = { countCartItems() }
        cartItems = { cartItems }
        renderColorAttribute = { renderColorAttribute }
        renderAttributes = { renderAttributes }
        totalPrice = { countTotalPrice() }
      />
    </>
  )
}

export default CartContainer;