const path = require('path')
const kebabCase = require('lodash/kebabCase')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('src/templates/blog-post.jsx')
  const tagTemplate = path.resolve('src/templates/tags.jsx')
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    throw (result.errors)
  }

  const posts = result.data.postsRemark.edges

  posts.forEach(({ node }, index) => {
    const { slug } = node.fields
    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === (posts.length - 1) ? null : posts[index + 1].node,
      },
    })
  })

  const tags = result.data.tagsGroup.group

  tags.forEach(tag => {
    const tagValue = tag.fieldValue
    createPage({
      path: `/tags/${kebabCase(tagValue)}/`,
      component: tagTemplate,
      context: {
        tag: tagValue,
      },
    })
  })
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}
