import { gql } from "@apollo/client/core";
import link from "./link";

export default gql`
  ${link}
  fragment Links on sections_ctas_BlockType {
    id
    children {
      ...Link
    }
    space
    theme: ctaTheme
  }
`;
