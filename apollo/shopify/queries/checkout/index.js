import gql from 'graphql-tag';
import checkout from './fragments/checkout';

export default gql`
  ${checkout}
  query ($checkoutId: ID!, $countryCode: CountryCode!)
  @inContext(country: $countryCode) {
    node(id: $checkoutId) {
      ...Checkout
    }
  }
`;

export const add = gql`
  ${checkout}
  mutation (
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    checkoutLineItemsAdd(
      checkoutId: $checkoutId
      lineItems: $lineItems
    ) {
      checkout {
        ...Checkout
      }
    }
  }
`;

export const create = gql`
  ${checkout}
  mutation ($input: CheckoutCreateInput!, $countryCode: CountryCode!)
  @inContext(country: $countryCode) {
    checkoutCreate(input: $input) {
      checkout {
        ...Checkout
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const remove = gql`
  ${checkout}
  mutation (
    $checkoutId: ID!
    $lineItemIds: [ID!]!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      checkout {
        ...Checkout
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const update = gql`
  ${checkout}
  mutation (
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    checkoutLineItemsUpdate(
      checkoutId: $checkoutId
      lineItems: $lineItems
    ) {
      checkout {
        ...Checkout
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const associateBuyer = gql`
  ${checkout}
  mutation (
    $checkoutId: ID!
    $customerAccessToken: String!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        ...Checkout
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const updateShipping = gql`
  ${checkout}
  mutation (
    $checkoutId: ID!
    $shippingAddress: MailingAddressInput!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    checkoutShippingAddressUpdateV2(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      checkout {
        ...Checkout
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
