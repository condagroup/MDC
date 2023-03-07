import { gql } from '@apollo/client/core';

export default gql`
  fragment Heading on sections_heading_BlockType {
    id
    heading
    heading2
    space
    headingTypo
    tag
    color
  }
`;
