import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import ProductDisplayComponent from './ProductDisplayComponent';
import { PRODUCT_QUERY } from '../../query/product.query';

const ProductDisplayContainer = () => {
  const { productId } = useParams();
  const [result] = useQuery({
    query: PRODUCT_QUERY(productId),
    variables: { product_id: productId },
  });  
  
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      { data && <ProductDisplayComponent product={data.product}/> }
    </>
  )
}

export default ProductDisplayContainer