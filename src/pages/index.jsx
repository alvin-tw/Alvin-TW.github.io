import React from 'react'
import { Link } from 'gatsby'

import { Card } from 'react-bootstrap'

import Layout from '@components/layout'
import SEO from '@components/seo'

const IndexPage = ({
  data,
}) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" />
      {
        posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Card border="light" as="article" key={node.fields.slug}>
              <Card.Header>{node.frontmatter.date}</Card.Header>
              <Card.Body>
                <Card.Title as="h3">
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </Card.Title>
                <Card.Text
                  as="section"
                  style={{ textAlign: 'justfy' }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description
                      || node.excerpt,
                  }}
                >
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })
      }
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
