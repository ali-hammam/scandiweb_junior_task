import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AttributeComponent from './Attribute.component';
import { saveToCart } from '../../lib/AddToCart';

const ProductAttributesComponent = ({ product, setCartVisible }) => {
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

    saveToCart(selectedProduct);
    setCartVisible(true);
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '40px' }}>
      <h3><strong>{product.name}</strong></h3>
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
