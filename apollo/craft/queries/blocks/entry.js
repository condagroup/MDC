import { gql } from '@apollo/client/core';

export default gql`
  fragment EntryBlock on sections_entry_BlockType {
    id
    label
    buttonText
    entry {
      id
    }
  }
`;
