import { gql } from '@apollo/client/core';

export default gql`
  fragment LinkInterface on linkField_Link {
    customText
    element {
      id
      slug
    }
    target
    text
    title
    type
    url
  }
`;
