import { gql } from '@apollo/client/core';
import featured from '../thumbs/featured';
import shop from '../thumbs/shop';

export default gql`
  ${featured}
  ${shop}
  fragment Thumb on sections_thumb_BlockType {
    id
    children {
      ... on sections_entry_BlockType {
        label
        entry {
          ...FeaturedThumb
          ...ShopThumb
        }
      }
    }
    space
    size: thumbSize
  }
`;
