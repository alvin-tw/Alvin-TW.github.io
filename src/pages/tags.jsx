import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { Helmet } from 'react-helmet'
import {
  Link,
  graphql,
} from 'gatsby'

import Layout from '@components/layout'

const TagGroup = styled.ul`
font-Size: 1.35rem;
`

const LinkElm = styled(Link)`
  text-decoration: none;
`

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <Helmet title={title} />
    <div>
      <h1>Tags</h1>
      <TagGroup>
        {
          group.map(tag => (
            <li key={tag.fieldValue}>
              <LinkElm to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {`${tag.fieldValue} ${tag.totalCount}`}
              </LinkElm>
            </li>
          ))
        }
      </TagGroup>
    </div>
  </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

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
