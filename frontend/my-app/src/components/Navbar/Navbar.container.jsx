import { useQuery } from 'urql';
import { CATEGORY_QUERY } from '../../query/Categories.query';
import NavbarComponent from './Navbar.component';

const NavbarContainer = ({ setCurrentCategory, setCartVisible, cartVisible }) => {
  const [result] = useQuery({ query: CATEGORY_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <>
      { data && 
        <NavbarComponent 
          categories={ data }
          setCurrentCategory={ setCurrentCategory }
          setCartVisible={setCartVisible}
          cartVisible={cartVisible}
        /> }
    </>
  )
}

export default NavbarContainer;