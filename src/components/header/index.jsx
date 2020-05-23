import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import {
  Nav,
  Navbar,
} from 'react-bootstrap'

const NavElm = styled(Nav)`
  font-size: 1.65rem;
`

const LinkElm = styled(Link)`
  &:hover {
    transform: scale(1.1);
  }
`

const Header = () => (
  <Navbar
    as="header"
    sticky="top"
    expand="lg"
    bg="dark"
    variant="dark"
    collapseOnSelect
  >
    <Navbar.Brand as="div" style={{ fontSize: '2.25rem' }}>Gastsby Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <NavElm className="ml-auto">
        <LinkElm className="nav-link" to="/">Home</LinkElm>
        <LinkElm className="nav-link" to="/tags">Tags</LinkElm>
        <LinkElm className="nav-link" to="/about">About</LinkElm>
      </NavElm>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
