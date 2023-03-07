import { gql } from '@apollo/client/core';

export default gql`
  fragment Upload on default_Asset {
    id
    jpeg0: url @transform(handle: "jpg600")
    jpegs: url @transform(handle: "jpg1200")
    jpegm: url @transform(handle: "jpg3000")
    webp0: url @transform(handle: "webp600")
    webps: url @transform(handle: "webp1200")
    webpm: url @transform(handle: "webp3000")
    alt
    width
    height
    caption
    mobileImage {
      id
      jpeg0: url @transform(handle: "jpg600")
      jpegs: url @transform(handle: "jpg1200")
      jpegm: url @transform(handle: "jpg3000")
      webp0: url @transform(handle: "webp600")
      webps: url @transform(handle: "webp1200")
      webpm: url @transform(handle: "webp3000")
      alt
      width
      height
      ... on default_Asset {
        caption
      }
    }
  }
`;
