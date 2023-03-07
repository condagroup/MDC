import { gql } from '@apollo/client/core';
import upload from '../assets/upload';

export default gql`
  ${upload}
  fragment ShopThumb on shop_default_Entry {
    id
    title
    url
    images {
      ...Upload
    }
    price: shopPrice
    status: shopStatus
    artists: shopArtistsList
  }
`;
