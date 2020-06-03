import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { Link, graphql } from 'gatsby'

import PageWrapper from './page-wrapper'

const TagList = ({ data: { allMarkdownRemark: { group: tags } } }) => (
  <PageWrapper title="標籤列表">
    <ul>
      {
        tags.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {`${tag.fieldValue} (${tag.totalCount})`}
            </Link>
          </li>
        ))
      }
    </ul>
  </PageWrapper>
)


export default TagList

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
