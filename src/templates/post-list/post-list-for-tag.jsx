import React from 'react'
import { graphql } from 'gatsby'

import PostListTemplate from './index'

const PostForTag = ({
  data: { allMarkdownRemark: { edges: posts } },
  pageContext: { currentPage, numPages, tag },
}) => {
  const props = {
    title: '標籤列表',
    pathname: {
      firstPagePath: `/tags/${tag}`,
      restPagePath: `/tags/${tag}`,
    },
    posts,
    currentPage,
    numPages,
  }
  return <PostListTemplate {...props} />
}

export default PostForTag

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!, $tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
  ) {
      edges {
        node {
<<<<<<< HEAD
          excerpt
=======
          excerpt(truncate: true, pruneLength: 120)
>>>>>>> develop
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
