import gql from 'graphql-tag';
import featured from '../thumbs/featured';
import shop from '../thumbs/shop';

export default gql`
  ${featured}
  ${shop}
  query (
    $site: [String]
    $section: [String]
    $limit: Int = 24
    $offset: Int = 0
    $orderBy: String = "postDate DESC"
    $excludeIds: [QueryArgument]
    $relatedToCategories: [CategoryCriteriaInput]
    $relatedToEntries: [EntryCriteriaInput]
    $descendantOf: Int
  ) {
    entries(
      site: $site
      section: $section
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      id: $excludeIds
      relatedToCategories: $relatedToCategories
      relatedToEntries: $relatedToEntries
      descendantOf: $descendantOf
    ) {
      slug
      title
      ...FeaturedThumb
      ...ShopThumb
    }

    entryCount(
      site: $site
      section: $section
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      id: $excludeIds
      relatedToCategories: $relatedToCategories
      relatedToEntries: $relatedToEntries
      descendantOf: $descendantOf
    )
  }
`;
