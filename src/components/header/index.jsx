import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import {
  Nav,
  Navbar,
} from 'react-bootstrap'

const StyledNavbarBrand = styled(Navbar.Brand)`
  font-size: 2rem;
`

const StyledNav = styled(Nav)`
  font-size: 1.2rem;
`

const StyledLink = styled(Link)`
  margin: 10px;
  color: #FFF;
  font-weight: bold;
  &:hover {
    color: #FFF;
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
    <StyledNavbarBrand as="div">
      <StyledLink to="/">{'Alvin\'s Notes'}</StyledLink>
    </StyledNavbarBrand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <StyledNav className="ml-auto">
        <StyledLink to="/articles">所有文章</StyledLink>
        <StyledLink to="/tags">標籤列表</StyledLink>
      </StyledNav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
