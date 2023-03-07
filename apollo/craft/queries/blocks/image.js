import { gql } from "@apollo/client/core";
import upload from "../assets/upload";

export default gql`
  ${upload}
  fragment Image on sections_image_BlockType {
    id
    image {
      ...Upload
    }
    caption
    size: mediaSize
    align: mediaAlign
  }
`;
