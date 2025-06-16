import ProductCardComponent from "../product_card/ProductCard.component";
import './product_list.css';

const ProductListComponent = ({ products, currentCategory, setCartVisible }) => {
  const toKebabCase = (str) => {
    return str
      .replace(/[_\s]+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase();
  };

  const category = currentCategory.toLowerCase();
  return (
    <div  style={{ marginTop:'80px', marginLeft:'8%' }}>
    <h1>{ currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) }</h1>
    <div className="container-fluid" style={{marginTop:'50px', marginLeft:'0px !important'}}>
      <div className="row">
        {products && products.map((product) => {
          if(category === 'all') {
            return(
              <div className="col-sm-4 product-col" key={product.id} data-testid={toKebabCase('product-'+ product.name)}>
                  <div className="product-wrapper">
                    <ProductCardComponent setCartVisible={setCartVisible} product={product} />
                  </div>
              </div>
            );
          }

          return(
            <>
              {
                product.category_id === currentCategory &&
                <div className="col-sm-4 product-col" key={product.id} data-testid={toKebabCase('product-'+ product.name)}>
                  <div className="product-wrapper">
                    <ProductCardComponent setCartVisible={setCartVisible} product={product} />
                  </div>
                </div>
              }
            </>
          );
        }
        )}
      </div>
    </div>
    </div>
  );
}

export default ProductListComponent