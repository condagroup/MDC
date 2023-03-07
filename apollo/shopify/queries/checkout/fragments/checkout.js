import gql from 'graphql-tag';

export default gql`
  fragment Checkout on Checkout {
    id
    completedAt
    email
    lineItems(first: 30) {
      nodes {
        id
        quantity
        title
      }
    }
    buyerIdentity {
      countryCode
    }
    lineItemsSubtotalPrice {
      amount
      currencyCode
    }
    subtotalPrice {
      amount
      currencyCode
    }
    totalDuties {
      amount
      currencyCode
    }
    totalPrice {
      amount
      currencyCode
    }
    checkoutUrl: webUrl
    shippingAddress {
      id
      firstName
      lastName
      address1
      address2
      company
      phone
      city
      country
      province
      zip
    }
  }
`;
