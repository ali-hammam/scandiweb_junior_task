import ImageCarouselComponent from '../ImageCarousel/ImageCarousel.component'
import ProductAttributesComponent from '../product_attributes/ProductAttributes.component'

const ProductDisplayComponent = ({ product }) => {
  return (
    <div className='row'>
      <div className='col-sm-8'>
        <ImageCarouselComponent images={product.gallery}/>
      </div>

      <div className='col-sm-2'>
        <ProductAttributesComponent product={ product } />
      </div>
    </div>
  )
}

export default ProductDisplayComponent