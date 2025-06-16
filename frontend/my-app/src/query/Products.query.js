import { gql } from 'urql';

export const PRODUCTS_QUERY = gql`
query {
  products {
    id,
    name,
    in_stock,
    gallery,
    brand,
    description,
    category_id,
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
}`;