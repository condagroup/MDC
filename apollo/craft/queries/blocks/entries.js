import { gql } from '@apollo/client/core';
import link from '../interfaces/link';

export default gql`
  ${link}
  fragment Entries on sections_entries_BlockType {
    id
    heading
    cta {
      ...LinkInterface
    }
    entries {
      id
    }
    stackLayoutA
    entryAlign
  }
`;
