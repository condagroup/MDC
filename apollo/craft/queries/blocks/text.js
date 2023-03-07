import { gql } from '@apollo/client/core';

export default gql`
  fragment Text on sections_text_BlockType {
    id
    text
    space
    typo
    color
  }
`;
