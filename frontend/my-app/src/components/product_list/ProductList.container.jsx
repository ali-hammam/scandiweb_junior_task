import { useQuery } from 'urql';
import { PRODUCTS_QUERY } from '../../query/Products.query';
import ProductListComponent from './ProductList.component';

const ProductListContainer = ({ currentCategory }) => {
  const [result] = useQuery({ query: PRODUCTS_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      { data.products && <ProductListComponent products={ data.products } currentCategory={currentCategory}/> }
    </>
  );
}

export default ProductListContainer