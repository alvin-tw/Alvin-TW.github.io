const path = require('path')
const kebabCase = require('lodash/kebabCase')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplate = path.resolve('src/templates/post.jsx')
  const postListForAllTemplate = path.resolve('src/templates/post-list/post-list-for-all.jsx')
  const postListForTagTemplate = path.resolve('src/templates/post-list/post-list-for-tag.jsx')
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
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)
  const tagsCount = {}

  posts.forEach(({
    node: {
      fields: { slug },
      frontmatter: { tags },
    },
  }, index) => {
    tags.forEach(tag => {
      if (tag in tagsCount) {
        tagsCount[tag] += 1
      } else {
        tagsCount[tag] = 1
      }
    })

    // Creat each post page
    createPage({
      path: slug,
      component: postTemplate,
      context: {
        slug,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === (posts.length - 1) ? null : posts[index + 1].node,
      },
    })

    // Create blog post list pages
    createPage({
      path: index === 0 ? '/' : `/page/${index + 1}`,
      component: postListForAllTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
      },
    })
  })

  // Create blog post list pages for each tag
  const tags = result.data.tagsGroup.group

  tags.forEach(tag => {
    const tagValue = tag.fieldValue
    const tagValueForPath = kebabCase(tagValue)
    const postAmount = tagsCount[tagValue]
    const numPagesForTag = Math.ceil(postAmount / postsPerPage)
    const pathname = `/tags/${tagValueForPath}`

    for (let index = 0; index < postAmount; index += 1) {
      createPage({
        path: index === 0 ? pathname : `${pathname}/${index + 1}`,
        component: postListForTagTemplate,
        context: {
          tag: tagValueForPath,
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages: numPagesForTag,
          currentPage: index + 1,
        },
      })
    }
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
