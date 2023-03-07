import gql from 'graphql-tag';

export default gql`
  fragment Product on Product {
    id
    handle
    title
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        id
      }
    }
  }
`;
