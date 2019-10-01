import React from 'react'

export default ({ pageContext: { post } }) => (
  <section>
    {post.name}
    {post.content}
  </section>
)
