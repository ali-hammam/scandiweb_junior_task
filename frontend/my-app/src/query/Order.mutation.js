import { gql } from 'urql';

export const CREATE_ORDER = gql`
  mutation CreateOrders($orders: [OrderInput!]!) {
    createOrder(orders: $orders) {
      id
      product_id
      unit_price
      quantity
      attributes {
        key
        value
      }
    }
  }
`;
