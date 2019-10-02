import React from 'react'

const Footer = () => (
  <footer>
    {`©${new Date().getFullYear()}, Built with `} 
    <a href="https://www.gatsbyjs.org" target="_blank">Gatsby</a>
    {` and `}
    <a href="https://react-bootstrap.github.io/" target="_blank">React Bootstrap</a>
  </footer>
)

export default Footer