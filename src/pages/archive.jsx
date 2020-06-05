import React from 'react'
import { Link, graphql } from 'gatsby'

import PageWrapper from './page-wrapper'

const Archive = ({
  location: { pathname },
  data: { allMarkdownRemark: { edges: posts } },
}) => {
  const postsGroupByYear = posts.reduce((tempPosts, currentPost) => {
    const {
      frontmatter: { date: year, title },
      fields: { slug },
    } = currentPost.node
    if (!tempPosts[year]) {
      tempPosts[year] = []
    }
    tempPosts[year].push({ title, slug })
    return tempPosts
  }, {})

  return (
    <PageWrapper title="所有文章" pathname={pathname}>
      {
        Object.keys(postsGroupByYear)
          .sort((a, b) => b - a)
          .map(year => (
            <div key={`${year}`}>
              <h4>{year}</h4>
              <ul>
                {
                  postsGroupByYear[year].map(post => (
                    <li key={post.slug}>
                      <Link to={post.slug}>{post.title}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
      }
    </PageWrapper>
  )
}

export default Archive

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY")
            title
          }
        }
      }
    }
}
`
