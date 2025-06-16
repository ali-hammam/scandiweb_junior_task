import { gql } from 'urql';

export const PRODUCT_QUERY = (productId) => gql`
  query {
    product(product_id: "${productId}") {
      id
      name
      brand
      gallery
      description
      in_stock
      product_price {
        currency_label
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
    }
  }
`;
