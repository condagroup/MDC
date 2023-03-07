import gql from 'graphql-tag';
import cart from './fragments/cart';

export default gql`
  ${cart}
  query ($cartId: ID!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    cart(id: $cartId) {
      ...Cart
    }
  }
`;

export const add = gql`
  ${cart}
  mutation ($cartId: ID!, $lines: [CartLineInput!]!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...Cart
      }
    }
  }
`;

export const create = gql`
  ${cart}
  mutation ($input: CartInput, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    cartCreate(input: $input) {
      cart {
        ...Cart
      }
    }
  }
`;

export const remove = gql`
  ${cart}
  mutation ($cartId: ID!, $lineIds: [ID!]!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...Cart
      }
    }
  }
`;

export const update = gql`
  ${cart}
  mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!, $countryCode: CountryCode!)
  @inContext(country: $countryCode) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...Cart
      }
    }
  }
`;

export const updateBuyer = gql`
  ${cart}
  mutation ($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!, $countryCode: CountryCode!)
  @inContext(country: $countryCode) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...Cart
      }
    }
  }
`;
