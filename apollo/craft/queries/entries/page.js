import { gql } from '@apollo/client/core';
import section from '../blocks';

export default gql`
  ${section}
  fragment Page on page_default_Entry {
    id
    title
    slug
    url
    sections {
      ...Section
    }
  }
`;
