import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '@components/layout'

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    markdownRemark: {
      frontmatter: {
        title,
        date
      },
      html
  }} = data
  const { prev, next } = pageContext

  return (
    <Layout>
      <article className="blog-post">
        <header>
          <Link to="/">Go back to home</Link>
          <h1>{title}</h1>
          <h4>{date}</h4>
        </header>
        <section
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.3rem',
            fontStyle: 'italic',
          }}
        >
          <span>
            {
              prev && (
                <>
                  {'Previous: '}
                  <Link
                    to={prev.fields.slug}
                    rel="prev"
                    style={{ textDecoration: 'none' }}
                  >
                    {prev.frontmatter.title}
                  </Link>
                </>
              )
            }
          </span>
          <span>
            {
              next && (
                <>
                  {'Next: '}
                  <Link
                    to={next.fields.slug}
                    rel="next"
                    style={{ textDecoration: 'none' }}
                  >
                    {next.frontmatter.title}
                  </Link>
                </>
              )
            }
          </span>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
