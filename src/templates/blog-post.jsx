import React from 'react'
import { Link, graphql } from 'gatsby'
import { Card } from 'react-bootstrap'

import Layout from '@components/layout'
import Tags from '@components/tags'

const BlogPostTemplate = ({
  data: {
    markdownRemark: {
      frontmatter: { tags, title, date },
      html,
    },
  },
  pageContext: { prev, next },
}) => (
  <Layout>
    <Card border="light" className="px-3 pb-3">
      <Card.Body>
        <Card.Title as="h2">{title}</Card.Title>
        <Card.Subtitle className="text-muted">
          <span className="pr-3">{date}</span>
          <Tags tags={tags} />
        </Card.Subtitle>
        <Card.Text dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
        <div className="d-flex justify-content-between">
          <span>
            {
            prev && (
              <>
                <span className="font-weight-bold">{'上一篇: '}</span>
                <Link to={prev.fields.slug}>{prev.frontmatter.title}</Link>
              </>
            )
          }
          </span>
          <span>
            {
            next && (
              <>
                <span className="font-weight-bold">{'下一篇: '}</span>
                <Link to={next.fields.slug}>{next.frontmatter.title}</Link>
              </>
            )
          }
          </span>
        </div>
      </Card.Body>
    </Card>
  </Layout>
)

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`
