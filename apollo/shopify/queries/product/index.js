import gql from 'graphql-tag';
import product from './fragments/product';

export const productPrices = gql`
  query ($handle: String!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    product(handle: $handle) {
      id
      handle
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
    }
  }
`;

export const productByHandle = gql`
  ${product}
  query ($handle: String!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    product(handle: $handle) {
      ...Product
    }
  }
`;

export const productById = gql`
  ${product}
  query ($id: ID!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    node(id: $id) {
      ...Product
    }
  }
`;
