import React from 'react'

const Footer = () => (
  <footer className="pb-2 text-center">
    <div>
      {`©${new Date().getFullYear()} Alvin-TW. All Rights Reserved.`}
    </div>
    <div>
      {'Built with '}
      <a
        href="https://www.gatsbyjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gatsby
      </a>
      {' and '}
      <a
        href="https://react-bootstrap.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        React Bootstrap
      </a>
      {' inspired by '}
      <a
        href="https://github.com/gatsbyjs/gatsby-starter-default"
        target="_blank"
        rel="noopener noreferrer"
      >
        {'Gatsby\'s default starter'}
      </a>
      .
    </div>
  </footer>
)

export default Footer
