import { gql } from "@apollo/client/core";
import image from "./image";
import video from "./video";

export default gql`
  ${image}
  ${video}
  fragment Media on sections_media_BlockType {
    id
    children {
      ...Image
      ...Video
    }
    space
    theme: mediaTheme
    showCaption
  }
`;
