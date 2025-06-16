import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AttributeComponent from './Attribute.component';

const ProductAttributesComponent = ({ product }) => {
  const [attributeValues, setAttributeValues] = useState({});
  const description = product.description.replace(/<[^>]*>/g, '');

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const selectedProduct = {
      id: product.id,
      name: product.name,
      image: product.gallery[0],
      price: product.product_price.amount,
      attributes: attributeValues,
      productAttributes: product.attributes
    };

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
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '40px' }}>
      <h3><strong>Running Shorts</strong></h3>
      {
        product.attributes.map(attribute => {
          return(
            <AttributeComponent
              attribute={attribute}
              attributeValues={attributeValues}
              setAttributeValues={setAttributeValues}
            />
          )
        })
      }

      <div className="form-group">
        <label><strong>PRICE:</strong></label>
        <h4><strong>${product.product_price.amount.toFixed(2)}</strong></h4>
      </div>

      <div className="form-group">
        <button 
          className="btn btn-success btn-block" 
          style={{ textTransform: 'uppercase' }}
          onClick={ handleAddToCart }
          disabled={ Object.keys(attributeValues).length !== product.attributes.length || !product.in_stock }
          data-testid='add-to-cart'
        >
          Add to Cart
        </button>
      </div>

      <p style={{ marginTop: '15px', color: '#444' }} data-testid='product-description'>
        {description}
      </p>
    </div>
  );
};

export default ProductAttributesComponent;
