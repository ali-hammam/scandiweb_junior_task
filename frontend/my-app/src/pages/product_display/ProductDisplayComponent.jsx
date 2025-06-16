import ImageCarouselComponent from '../../components/ImageCarousel/ImageCarousel.component'
import ProductAttributesComponent from '../../components/product_attributes/ProductAttributes.component'

const ProductDisplayComponent = ({ product, setCartVisible }) => {
  return (
    <div className='row'>
      <div className='col-sm-8'>
        <ImageCarouselComponent images={product.gallery}/>
      </div>

      <div className='col-sm-2'>
        <ProductAttributesComponent setCartVisible={setCartVisible} product={ product } />
      </div>
    </div>
  )
}

export default ProductDisplayComponent