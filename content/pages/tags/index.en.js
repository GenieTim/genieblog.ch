import React from 'react';
import TagsPage from '../../components/pages/Tags';
import { graphql } from 'gatsby';

export default (props) => <TagsPage {...props} />;

export const pageQuery = graphql`
  query TagsEnQuery {
    allMarkdownRemark(
      limit: 2000
      filter: {
        frontmatter: { draft: { ne: true } } ,
        fields: {
          langKey: {eq: "en"}
        }
      }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
