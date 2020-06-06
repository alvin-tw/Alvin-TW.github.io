import React from 'react'
import { Link, graphql } from 'gatsby'
import { Card } from 'react-bootstrap'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

import Layout from '@components/layout'
import SEO from '@components/seo'
import Tags from '@components/tags'

const PostTemplate = ({
  location: { pathname },
  data: {
    markdownRemark: {
      html,
      plainText,
      id,
      frontmatter: {
        tags, title, date,
      },
    },
  },
  pageContext: { prev, next },
}) => {
  const disqusConfig = {
    url: `https://alvin-blog.netlify.app/${pathname}`,
    identifier: id,
    title,
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={plainText.substr(0, 120)}
        pathname={pathname}
        isPost
      />
      <Card border="light" className="px-3 pb-3">
        <Card.Body>
          <Card.Title as="h1" className="font-weight-bold">{title}</Card.Title>
          <Card.Subtitle className="text-muted">
            <span className="pr-3">{date}</span>
            <Tags tags={tags} />
          </Card.Subtitle>
          <Card.Text dangerouslySetInnerHTML={{ __html: html }} />
          <hr />
          <div className="d-flex justify-content-between mb-5">
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
          <Disqus config={disqusConfig} />
        </Card.Body>
      </Card>
    </Layout>
  )
}


export default PostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      plainText
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`
