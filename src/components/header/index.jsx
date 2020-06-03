import React from 'react'
import { Link } from 'gatsby'
import { Nav, Navbar } from 'react-bootstrap'

const Header = () => (
  <Navbar
    as="header"
    sticky="top"
    expand="lg"
    bg="dark"
    variant="dark"
    collapseOnSelect
  >
    <Navbar.Brand>
      <Link to="/" className="h2 text-white font-weight-bold">{'Alvin\'s Blog'}</Link>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav className="ml-auto">
        <Link to="/archive" className="m-2 text-white">所有文章</Link>
        <Link to="/tags" className="m-2 text-white">標籤列表</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
