import React from 'react'
import { Link, graphql } from 'gatsby'

import { Badge, Card } from 'react-bootstrap'

import Layout from '@components/layout'
import SEO from '@components/seo'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" />
      {
        posts.map(({ node }) => {
          const {
            excerpt,
            frontmatter: { tags, title, date },
            fields: { slug },
          } = node
          return (
            <Card
              border="light"
              as="article"
              key={slug}
              style={{ marginBottom: '50px' }}
            >
              <Card.Header>{date}</Card.Header>
              <Card.Body>  
                <div className="tags">
                  {
                    tags.split(/,\s+/).map(tag =>
                      <Badge
                        variant="info"
                        style={{ margin: '0 2px', fontSize: '1rem' }}
                      >
                        {tag}
                      </Badge>
                    )
                  }
                </div>
                <Card.Title as="h1">
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={slug}
                  >
                    {title || slug}
                  </Link>
                </Card.Title>
                <Card.Text
                  as="section"
                  style={{ textAlign: 'justfy' }}
                  dangerouslySetInnerHTML={{ __html: excerpt }}
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
            tags
          }
        }
      }
    }
  }
`
