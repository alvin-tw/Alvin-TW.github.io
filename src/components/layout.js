import React from 'react'
import PropTypes from 'prop-types'
import { Container, Col, Row } from 'react-bootstrap'

import Header from './header'
import Footer from './footer'
import LeftSidebar from './left-sidebar'

const Layout = ({ children }) => (
  <div>
    <Header />
    <Container fluid>
      <Row className="my-5">
        <Col md={3} className="left-sidebar text-center">
          <LeftSidebar />
        </Col>
        <Col md={9} as="main">
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
