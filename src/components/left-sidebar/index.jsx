import React from 'react'
import { Card } from 'react-bootstrap'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import avatar from '@images/gatsby-icon.png'

const LeftSidebar = () => (
  <Card border="light" className="d-flex mb-3 p-3 align-items-center">
    <Card.Img src={avatar} style={{ width: 125, height: 125 }} />
    <Card.Body>
      <Card.Title>Alvin</Card.Title>
      <Card.Text>
        <p>前端工程師</p>
        <p>這裡用來紀錄開發心得與筆記，歡迎交流!</p>
      </Card.Text>
      <Card.Link href="http://githubUrl.com" target="_blank">
        <FaGithub size={32} />
      </Card.Link>
      <Card.Link href="http://linkInUrl.com" target="_blank">
        <FaLinkedin size={32} />
      </Card.Link>
    </Card.Body>
  </Card>
)

export default LeftSidebar
