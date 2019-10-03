import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '@components/layout'

const Template = ({ data, pageContext }) => {
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
          <p>{date}</p>
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

export default Template

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
