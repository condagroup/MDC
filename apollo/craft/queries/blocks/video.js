import { gql } from '@apollo/client/core';
import upload from '../assets/upload';

export default gql`
  ${upload}
  fragment Video on sections_video_BlockType {
    id
    src
    mobileSrc
    ratio {
      x
      y
    }
    # mobileRatio {
    #   x
    #   y
    # }
    poster {
      ...Upload
    }
    caption
  }
`;
