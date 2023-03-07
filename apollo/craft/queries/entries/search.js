import gql from 'graphql-tag';
import featured from '../thumbs/featured';
import shop from '../thumbs/shop';

export default gql`
  ${featured}
  ${shop}
  query ($site: [String], $section: [String], $limit: Int = 24, $offset: Int = 0, $search: String) {
    entries(site: $site, section: $section, limit: $limit, offset: $offset, search: $search) {
      slug
      title
      ...FeaturedThumb
      ...ShopThumb
    }

    entryCount(site: $site, section: $section, limit: $limit, offset: $offset, search: $search)
  }
`;
