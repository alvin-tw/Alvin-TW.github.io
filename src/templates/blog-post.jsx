import React from 'react'
import styled from 'styled-components'
import {
  Link,
  graphql,
} from 'gatsby'

import Layout from '@components/layout'

const Date = styled.h5`
  color: #666;
`

const Section = styled.section`
  font-size: 1.1rem;
`

const LinkGroup = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  font-style: italic;
`

const LinkWithoutDecoration = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    markdownRemark: {
      frontmatter: {
        title,
        date,
      },
      html,
    },
  } = data
  const { prev, next } = pageContext

  return (
    <Layout>
      <article className="blog-post">
        <header>
          <h1>{title}</h1>
          <Date>{date}</Date>
        </header>
        <Section
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <hr />
        <LinkGroup>
          <span>
            {
              prev && (
                <>
                  {'Previous: '}
                  <LinkWithoutDecoration
                    to={prev.fields.slug}
                    rel="prev"
                  >
                    {prev.frontmatter.title}
                  </LinkWithoutDecoration>
                </>
              )
            }
          </span>
          <span>
            {
              next && (
                <>
                  {'Next: '}
                  <LinkWithoutDecoration
                    to={next.fields.slug}
                    rel="next"
                  >
                    {next.frontmatter.title}
                  </LinkWithoutDecoration>
                </>
              )
            }
          </span>
        </LinkGroup>
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
