import React from 'react'

import { Badge } from 'react-bootstrap'

const Tags = ({ tags }) => (
  <>
    {tags.map(tag => <Badge key={tag} variant="dark" className="m-1">{tag}</Badge>)}
  </>
)

export default Tags
