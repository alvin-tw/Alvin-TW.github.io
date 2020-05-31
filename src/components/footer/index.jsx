import React from 'react'

const Footer = () => (
  <footer className="pb-2 text-center">
    {`©${new Date().getFullYear()}. All Rights Reserved. Built with `}
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
  </footer>
)

export default Footer
