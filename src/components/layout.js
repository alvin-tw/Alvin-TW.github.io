import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Col,
  Row,
} from 'react-bootstrap'

import Header from './header'
import Footer from './footer'
import LeftSidebar from './left-sidebar'
import './layout.css'

const Layout = ({ children }) => (
  <div
    style={{
      position: 'relative',
      minHeight: '100vh',
    }}
  >
    <Header />
    <Container fluid>
      <Row>
        <Col
          md={3}
          className="column-container left-sidebar text-center"
        >
          <LeftSidebar />
        </Col>
        <Col
          as="main"
          md={9}
          className="column-container"
        >
          {children}
        </Col>
      </Row>
    </Container>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
