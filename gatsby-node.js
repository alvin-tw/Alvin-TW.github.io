/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const posts = [
    {
      name: 'post1',
      content: 'content1',
    },
    {
      name: 'post2',
      content: 'content2',
    },
  ]
  posts.forEach(post => {
    createPage({
      path: `/${post.name}`,
      component: require.resolve('./src/templates/post.js'),
      context: { post },
    })
  })
}
