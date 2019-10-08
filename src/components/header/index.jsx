import React from 'react'
import { Link } from 'gatsby'

import {
  Nav,
  Navbar,
} from 'react-bootstrap'

import './style.scss'

const Header = () =>  (
  <Navbar
    as='header'
    collapseOnSelect
    sticky="top"
    expand="lg"
    bg="dark"
    variant="dark"
    style={{fontWeight: 'bold'}}
  >
    <Navbar.Brand as="div" style={{fontSize: '2.25rem'}}>Gastsby Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto" style={{ fontSize: '1.65rem' }}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/tags">Tags</Link>
        <Link className="nav-link" to="/about">About</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header