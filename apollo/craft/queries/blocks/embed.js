import { gql } from '@apollo/client/core';

export default gql`
  fragment Embed on sections_embed_BlockType {
    id
    embed
    space
  }
`;
