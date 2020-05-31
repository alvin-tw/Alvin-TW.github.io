import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import { Card, Pagination } from 'react-bootstrap'

import Layout from '@components/layout'
import SEO from '@components/seo'
import Tags from '@components/tags'

const BlogPostListTemplate = ({
  data: { allMarkdownRemark: { edges: posts } },
  pageContext: { currentPage, numPages },
}) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : `page/${(currentPage - 1)}`
  const nextPage = (currentPage + 1)

  return (
    <Layout>
      <SEO title="Alvin's Blog" />
      {
        posts.map(({
          node: {
            excerpt,
            frontmatter: { tags, title, date },
            fields: { slug },
          },
        }) => (
          <Card key={slug} border="light" className="mb-3 px-3">
            <Card.Body>
              <Link className="text-decoration-none" to={slug}>
                <Card.Title className="text-body" as="h2">{title || slug}</Card.Title>
                <Card.Subtitle className="text-muted">{date}</Card.Subtitle>
                <Card.Text className="my-3 text-body" dangerouslySetInnerHTML={{ __html: excerpt }} />
              </Link>
              <Tags tags={tags} />
            </Card.Body>
          </Card>
        ))
      }
      <Pagination className="float-right">
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
