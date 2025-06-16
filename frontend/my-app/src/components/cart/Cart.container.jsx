import CartComponent from './cart.component';

const CartContainer = ({ cartItems, setCartVisible, cartVisible }) => {  
  const toKebabCase = (str) => {
    return str
      .replace(/[_\s]+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
  };

  const toggleMenu = () => setCartVisible(!cartVisible);

  const countCartItems = () => cartItems.reduce((accum, item) => accum + item.quantity, 0);
  
  const countTotalPrice = () => cartItems.reduce((accum, item) => accum + (item.price * item.quantity), 0);

  const renderColorAttribute = (cartItem, attribute) => {
    return (
      <div data-testid="product-attribute-color">
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
                data-testid={
                  cartItem.attributes.color === color.value ? `product-attribute-color-${color.displayValue}-selected` 
                  : `product-attribute-color-${color.displayValue}`
                }
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
          <div data-testid={`product-attribute-${toKebabCase(attributeName.toLowerCase())}`}>
            <strong>{attributeName.toUpperCase()}:</strong>
            <div className="btn-group" style={{ width: '200px' }}>
            {attribute.items.map(item => (
                <button 
                  style={{
                    backgroundColor: cartItem.attributes[attributeName.toLowerCase()] === item.value ? 'black' :'#ffffff',
                    color: cartItem.attributes[attributeName.toLowerCase()] === item.value ? '#ffffff' :'black',
                    width: 'auto',
                    height: '40px',
                    border: '2px solid black',
                    marginRight: '5px'
                  }}
                  name={attribute.name} 
                  value={item.value}
                  checked={cartItem.attributes[attributeName.toLowerCase()] === item.value}
                  readOnly
                  data-testid={
                    cartItem.attributes[attributeName.toLowerCase()] === item.value ?
                    `product-attribute-${toKebabCase(attributeName.toLowerCase())}-${toKebabCase(item.value)}-selected`
                    :`product-attribute-${toKebabCase(attributeName.toLowerCase())}-${toKebabCase(item.value)}`
                  }
                  disabled
                >
                  {item.value}
                </button>
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