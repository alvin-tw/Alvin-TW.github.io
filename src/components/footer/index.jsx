import React from 'react'
import styled from 'styled-components'

const FooterElm = styled.footer`
  position: absolute;
  bottom: 10px;
  width: 100%;
  font-size: 0.8em;
  text-align: center;
`

const Footer = () => (
  <FooterElm>
    {`©${new Date().getFullYear()}, Built with `}
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
  </FooterElm>
)

export default Footer
