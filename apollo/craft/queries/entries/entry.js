import { gql } from '@apollo/client/core';
import featured from './featured';
import page from './page';
import shop from './shop';

export default gql`
  ${page}
  ${shop}
  ${featured}
  query ($site: [String], $slug: [String], $section: [String]) {
    entry(site: $site, slug: $slug, section: $section) {
      ...Page
      ...Shop
      ...Featured
    }
  }
`;
