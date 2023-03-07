import { gql } from '@apollo/client/core';
import upload from '../assets/upload';

export default gql`
  ${upload}
  fragment Shop on shop_default_Entry {
    id
    title
    status: shopStatus
    slug
    url
    price: shopPrice
    shopifyId: shopShopifyId
    artists: shopArtistsList
    isbn: shopIsbn
    edition: shopEdition
    packing: shopPacking
    technique: artworkTechnique
    text
    year
    payment: shopPayment
    shipping: shopShipping
    typology: shopTypology {
      slug
    }
    images {
      ...Upload
    }
    dimensions: shopDimensions {
      height
      weight
      width
    }
    sizes {
      cm
      in
    }
    sections {
      ...Section
    }
  }
`;
