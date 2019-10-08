import React from 'react'
import { Link } from 'gatsby'

import {
  Nav,
  Navbar,
} from 'react-bootstrap'

const Header = () =>  (
  <Navbar
    as='header'
    collapseOnSelect
    sticky="top"
    expand="lg"
    bg="dark"
    variant="dark"
  >
    <Navbar.Brand as="div" style={{fontSize: '2rem'}}>Gastsby Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto" style={{ fontSize: '1.8rem' }}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/tags">Tags</Link>
        <Link className="nav-link" to="/about">About</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header