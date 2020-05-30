import React from 'react'
import {
  Link,
  graphql,
  navigate,
} from 'gatsby'
import {
  Badge,
  Card,
  Pagination,
} from 'react-bootstrap'

import Layout from '@components/layout'
import SEO from '@components/seo'

const BlogPostListTemplate = ({
  data: {
    allMarkdownRemark: {
      edges: posts,
    },
  },
  pageContext: {
    currentPage,
    numPages,
  },
}) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : `page/${(currentPage - 1)}`
  const nextPage = (currentPage + 1)
  return (
    <Layout>
      <SEO title="Alvin's Notes" />
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
                    tags.map(tag => (
                      <Badge
                        key={`${tag}_${title}`}
                        className="tag"
                        variant="info"
                        style={{
                          margin: '2px',
                          fontSize: '1rem',
                          fontWeight: 'normal',
                        }}
                      >
                        {tag}
                      </Badge>
                    ))
                  }
                  <Card.Title as="h1">

                    {title || slug}
                    {/* </Link> */}
                  </Card.Title>
                  <Card.Text
                    as="section"
                    style={{ textAlign: 'justfy', color: '#666' }}
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                  />
                </Card.Body>
              </Link>
            </Card>
          )
        })
      }
      <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
        {
          !isFirst && (
            <>
              <Pagination.First onClick={() => { navigate('/') }} />
              <Pagination.Prev onClick={() => { navigate(prevPage) }} />
            </>
          )
        }
        {
          Array.from({ length: numPages }, (_, index) => {
            const pageIndex = index + 1
            return (
              <Pagination.Item
                active={currentPage === pageIndex}
                onClick={() => {
                  navigate(pageIndex === 1
                    ? '/'
                    : `/page/${pageIndex}`)
                }}
              >
                {pageIndex}
              </Pagination.Item>
            )
          })
        }
        {
          !isLast && (
            <>
              <Pagination.Next onClick={() => { navigate(`/page/${nextPage}`) }} />
              <Pagination.Last onClick={() => { navigate(`/page/${numPages}`) }} />
            </>
          )
        }
      </Pagination>
    </Layout>
  )
}

export default BlogPostListTemplate

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
  ) {
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
