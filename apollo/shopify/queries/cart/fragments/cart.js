import gql from 'graphql-tag';

export default gql`
  fragment Cart on Cart {
    id
    attributes {
      key
      value
    }
    lines(first: 30) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            title
            image {
              id
              jpeg0: url(transform: { maxWidth: 600 })
              jpegs: url(transform: { maxWidth: 1200 })
              jpegm: url(transform: { maxWidth: 3000 })
              webp0: url(transform: { maxWidth: 600 })
              webps: url(transform: { maxWidth: 1200 })
              webpm: url(transform: { maxWidth: 3000 })
              width
              height
            }
            product {
              title
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
    discountCodes {
      code
    }
    buyerIdentity {
      countryCode
      customer {
        id
      }
      deliveryAddressPreferences
    }
    checkoutUrl
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    totalQuantity
  }
`;
