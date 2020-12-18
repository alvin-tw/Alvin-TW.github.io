import React from 'react'
import { graphql } from 'gatsby'

import PostListTemplate from './index'

const PostForAll = ({
  data: { allMarkdownRemark: { edges: posts } },
  pageContext: { currentPage, numPages },
}) => {
  const props = {
    title: '首頁',
    pathname: {
      firstPagePath: '/',
      restPagePath: '/page',
    },
    posts,
    currentPage,
    numPages,
  }
  return <PostListTemplate {...props} />
}

export default PostForAll

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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
