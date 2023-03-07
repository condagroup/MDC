import { gql } from '@apollo/client/core';

export default gql`
  fragment Navigation on navigation_NeoField {
    ... on navigation_columns_BlockType {
      children {
        ... on navigation_items_BlockType {
          cta {
            title
            customText
            url
            element {
              id
              title
            }
          }
          children {
            ... on navigation_items_BlockType {
              cta {
                title
                customText
                url
                element {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  }
  query ($site: [String], $section: [String]) {
    entry(site: $site, section: $section) {
      ... on navigation_navigation_Entry {
        navigation {
          ...Navigation
        }
      }
      ... on footer_footer_Entry {
        navigation {
          ...Navigation
        }
        text
      }
    }
  }
`;
