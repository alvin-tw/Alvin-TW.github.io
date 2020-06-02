import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({
  title,
  description = '',
  meta = [],
  isPost = false,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{ lang: 'zh-tw' }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'auther',
          content: site.siteMetadata.author,
        },
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: `${title} | ${site.siteMetadata.title}`,
        },
        {
          property: 'og:site_name',
          content: site.siteMetadata.title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: isPost ? 'article' : 'website',
        },
      ].concat(meta)}
    />
  )
}

export default SEO
