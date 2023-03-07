import { gql } from "@apollo/client/core";
import link from "../interfaces/link";

export default gql`
  ${link}
  fragment Link on sections_cta_BlockType {
    id
    cta {
      ...LinkInterface
    }
  }
`;
