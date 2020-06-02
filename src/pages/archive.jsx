import React from 'react'
import { Link, graphql } from 'gatsby'
import { Card } from 'react-bootstrap'

import Layout from '@components/layout'
import SEO from '@components/seo'

const Archive = ({ data: { allMarkdownRemark: { edges: posts } } }) => {
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
    <Layout>
      <SEO title="所有文章" />
      <Card border="light">
        {
          Object.keys(postsGroupByYear)
            .sort((a, b) => b - a)
            .map(year => (
              <div key={`${year}`} className="px-4 py-2">
                <h4>{year}</h4>
                {
                  postsGroupByYear[year].map(post => (
                    <li key={post.slug}>
                      <Link to={post.slug}>{post.title}</Link>
                    </li>
                  ))
                }
              </div>
            ))
        }
      </Card>
    </Layout>
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
