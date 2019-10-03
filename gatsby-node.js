const path = require('path')
const {
  createFilePath,
} = require('gatsby-source-filesystem')

exports.createPages = async ({
  actions,
  graphql,
}) => {
  const {
    createPage,
  } = actions
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    throw (result.errors)
  }

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(post => {
    createPage({
      // Path for this page — required
      path: post.node.fields.slug,
      component: path.resolve('src/templates/blog-post.jsx'),
      context: {
        slug: post.node.fields.slug,
      },
    })
  })
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
}) => {
  const {
    createNodeField,
  } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({
      node,
      getNode,
    })
    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}
