import React from 'react'
import { Card } from 'react-bootstrap'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import avatar from '@images/avatar.png'

const LeftSidebar = () => (
  <Card border="light" className="d-flex mb-3 p-3 align-items-center">
    <Card.Img
      src={avatar}
      style={{
        width: 125,
        height: 125,
        borderRadius: '50%',
        backgroundColor: '#F5F5F5',
      }}
    />
    <Card.Body>
      <Card.Title>Alvin</Card.Title>
      <Card.Text as="div">
        <p>前端工程師</p>
        <p>這裡用來紀錄開發心得與筆記，歡迎交流!</p>
      </Card.Text>
      <Card.Link href="https://github.com/Alvin-TW" target="_blank">
        <FaGithub size={32} />
      </Card.Link>
      <Card.Link href="https://www.linkedin.com/in/Alvin-TW/" target="_blank">
        <FaLinkedin size={32} />
      </Card.Link>
    </Card.Body>
  </Card>
)

export default LeftSidebar
