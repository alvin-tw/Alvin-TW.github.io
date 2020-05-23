import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-bootstrap'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import avatar from '@images/gatsby-icon.png'

const Avatar = styled(Image)`
  width: 150px;
  height: 150px;
  margin: 25px 0;
`

const SocialMedia = styled.div`
  margin: 5px;
`

const LeftSidebar = () => (
  <>
    <Avatar src={avatar} />
    <div className="bio">
      <h2>Alvin</h2>
      <h4>Front-end Enginer</h4>
      <p>5+ years of work experience</p>
      <SocialMedia>
        <a
          href="http://githubUrl.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={32} />
        </a>
        <a
          href="http://linkInUrl.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={32} />
        </a>
      </SocialMedia>
    </div>
  </>
)

export default LeftSidebar
