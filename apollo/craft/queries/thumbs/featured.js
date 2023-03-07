import { gql } from '@apollo/client/core';
import upload from '../assets/upload';

export default gql`
  ${upload}
  fragment FeaturedThumb on featured_default_Entry {
    id
    title
    url
    excerpt
    images {
      ...Upload
    }
  }
`;
