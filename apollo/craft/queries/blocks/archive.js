import { gql } from '@apollo/client/core';
import entries from './entries';
import link from '../interfaces/link';

export default gql`
  ${link}
  fragment Archive on sections_archive_BlockType {
    id
    heading
    cta {
      ...LinkInterface
    }
    entriesType
    shopTypology {
      slug
    }
    space
    limit
    order
    loadMore
  }
`;
