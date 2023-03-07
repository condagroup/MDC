import { gql } from '@apollo/client/core';
import text from './text';
import heading from './heading';
import links from './links';
import media from './media';
import embed from './embed';
import thumb from './thumb';
import stack from './stack';
import archive from './archive';

export default gql`
  ${text}
  ${heading}
  ${links}
  ${media}
  ${embed}
  ${thumb}
  ${stack}
  ${archive}
  fragment Section on sections_blocks_BlockType {
    id
    children {
      ...Text
      ...Heading
      ...Links
      ...Media
      ...Embed
      ...Thumb
      ...Stack
      ...Archive
    }
    layout: sectionLayout
    theme: sectionTheme
  }
`;
