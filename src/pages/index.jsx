import React from 'react'
import { Link, graphql } from 'gatsby'
import { Badge, Card } from 'react-bootstrap'

import Layout from '@components/layout'
import SEO from '@components/seo'

import './styles.scss'

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
              style={{ marginBottom: '15px' }}
            >
              <Card.Header as="h4">{date}</Card.Header>
               <Link
                  style={{ textDecoration: 'none' }}
                  to={slug}
                >
                <Card.Body>  
                  {
                    tags.map(tag =>
                      <Badge
                        key={ `${tag}_${title}` }
                        className="tag"
                        variant="info"
                        style={{
                          margin: '2px',
                          fontSize: '1rem',
                          fontWeight: 'normal'
                        }}
                      >
                        {tag}
                      </Badge>
                    )
                  }
                  <Card.Title as="h1">
                  
                      {title || slug}
                    {/* </Link> */}
                  </Card.Title>
                  <Card.Text
                    as="section"
                    style={{ textAlign: 'justfy', color: '#666' }}
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                  >
                  </Card.Text>
                </Card.Body>
              </Link>
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
