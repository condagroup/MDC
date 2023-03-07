import { gql } from '@apollo/client/core/core.cjs';

export default gql`
  query ($site: [String]) {
    entry(site: $site, section: "labels") {
      ... on labels_labels_Entry {
        id
        siteHandle
        labels {
          key
          value
        }
      }
    }
  }
`;
