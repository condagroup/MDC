import { gql } from '@apollo/client/core';
import featured from '../thumbs/featured';
import shop from '../thumbs/shop';
import link from '../interfaces/link';

export default gql`
  ${featured}
  ${shop}
  ${link}
  fragment Stack on sections_stack_BlockType {
    id
    children {
      ... on sections_entries_BlockType {
        heading
        cta {
          ...LinkInterface
        }
        entries {
          ...FeaturedThumb
          ...ShopThumb
        }
        layout: stackLayout
      }
    }
    space
  }
`;
