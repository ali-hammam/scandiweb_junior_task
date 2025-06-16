import { gql } from 'urql';

export const CATEGORY_QUERY = gql`
query {
  categories {
    name
  }
}`;