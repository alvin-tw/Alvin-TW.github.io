import React from 'react'
import { Link, navigate } from 'gatsby'
import { Card, Pagination } from 'react-bootstrap'

import Layout from '@components/layout'
import SEO from '@components/seo'
import Tags from '@components/tags'

const PostListTemplate = ({
  title: pageTitle,
  pathname: { firstPagePath, restPagePath },
  posts,
  currentPage,
  numPages,
}) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1
    ? firstPagePath
    : `${restPagePath}/${(currentPage - 1)}`
  const nextPage = (currentPage + 1)

  return (
    <Layout>
      <SEO title={pageTitle} />
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
                <Card.Title as="h1" className="text-body font-weight-bold">{title || slug}</Card.Title>
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
              <Pagination.First onClick={() => { navigate(`${firstPagePath}`) }} />
              <Pagination.Prev onClick={() => { navigate(prevPage) }} />
            </>
          )
        }
        {
          Array.from({ length: numPages }, (_, index) => {
            const pageIndex = index + 1
            return (
              <Pagination.Item
                key={pageIndex}
                active={currentPage === pageIndex}
                onClick={() => {
                  navigate(pageIndex === 1
                    ? `${firstPagePath}`
                    : `${restPagePath}/${pageIndex}`)
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
              <Pagination.Next onClick={() => { navigate(`${restPagePath}/${nextPage}`) }} />
              <Pagination.Last onClick={() => { navigate(`${restPagePath}/${numPages}`) }} />
            </>
          )
        }
      </Pagination>
    </Layout>
  )
}

export default PostListTemplate
