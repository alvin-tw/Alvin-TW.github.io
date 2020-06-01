const path = require('path')

module.exports = {
  siteMetadata: {
    title: '',
    description: '',
    author: '',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              path: `${__dirname}/content/asserts`,
              name: 'asserts',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@src': 'src',
          '@components': path.resolve(__dirname, 'src/components'),
          '@pages': path.resolve(__dirname, 'src/pages'),
          '@images': path.resolve(__dirname, 'src/images'),
        },
        extensions: [
          '.js', '.jsx',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-101449661-2',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
      },
    },
    'gatsby-plugin-netlify-cms',
  ],
}
