import React from 'react'
import PropTypes from 'prop-types'
import {
  Link,
  graphql,
} from 'gatsby'

import Layout from '@components/layout'

const TagsTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  const postsByYear = edges.reduce((obj, curr) => {
    const newDate = curr.node.frontmatter.date.split('-')
    const year = newDate[0]
    const mmdd = `${newDate[1]}-${newDate[2]}`

    if (!obj[year]) {
      obj[year] = []
    }

    obj[year].push({
      title: curr.node.frontmatter.title,
      date: mmdd,
      slug: curr.node.fields.slug,
    })

    return obj
  }, {})

  return (
    <Layout>
      <h1>{tagHeader}</h1>
      {
        Object.keys(postsByYear)
          .sort((a, b) => b - a)
          .map(year => (
            <div key={`${year}`}>
              <h1>{year}</h1>
              {
              postsByYear[year].map(post => (
                <li key={post.slug}>
                  {post.date}
                  <Link key={post.slug} to={post.slug}>{post.title}</Link>
                </li>
              ))
            }
            </div>
          ))
      }
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

TagsTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              date: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`
