import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import {
  Container,
  Col,
  Row,
} from 'react-bootstrap'

import Header from './header'
import Footer from './footer'
import './layout.css'

const Layout = ({ children }) => (
  <>
    <Header />
    <Container fluid>
      <Row>
        <Col
          md={2}
          className="column-container left-sidebar text-center"
        >
          left-sidebar
        </Col>
        <Col
          as="main"
          md={8}
          className="column-container"
        >
          {children}
        </Col>
        <Col
          md={2}
          className="column-container right-sidebar text-center"
        >
          right-sidebar
        </Col>
      </Row>
    </Container>
    <Footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
