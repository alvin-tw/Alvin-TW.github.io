import React from 'react'

import { Badge } from 'react-bootstrap'

const Tags = ({ tags }) => (
  <>
    {tags.map(tag => <Badge key={tag} variant="dark" className="my-1 mr-1 px-2 py-1">{tag}</Badge>)}
  </>
)

export default Tags
