import { gql } from '@apollo/client/core';

export default gql`
  fragment Featured on featured_default_Entry {
    id
    title
    slug
    url
    sections {
      ...Section
    }
  }
`;
