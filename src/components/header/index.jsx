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
    className="w-100"
    sticky="top"
    expand="lg"
    bg="dark"
    variant="dark"
  >
    <Navbar.Brand as="div"><Link to="/">Gastsby Home</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Link to="/about">About</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header