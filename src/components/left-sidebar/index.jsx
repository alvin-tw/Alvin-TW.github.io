import React from 'react'
import { Image } from 'react-bootstrap'
import { FaGithub, FaLinkedin } from "react-icons/fa"

import avatar from '@images/gatsby-icon.png'

const LeftSidebar = () => (
  <>
    <Image className="avatar" src={avatar} />
    <div className="bio">
      <h2>Alvin</h2>
      <h4>Front-end Enginer</h4>
      <p>5+ years of work experience</p>
      <div className="social-media">
        <a href="http://githubUrl.com" target="_blank">
          <FaGithub size={32} />
        </a>
        <a href="http://linkInUrl.com" target="_blank">
          <FaLinkedin size={32} />
        </a>
      </div>
    </div>
  </>
)

export default LeftSidebar
