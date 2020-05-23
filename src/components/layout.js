import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Container,
  Col,
  Row,
} from 'react-bootstrap'

import Header from './header'
import Footer from './footer'
import LeftSidebar from './left-sidebar'

const LayoutElm = styled.div`
  position: relative;
  minHeight: 100vh;
  margin: 0;
  padding: 0;
  height: 100%;
  background: #F5F5DC;
`

const RowElm = styled(Row)`
  padding: 50px 20px;
`

const Layout = ({ children }) => (
  <LayoutElm>
    <Header />
    <Container fluid>
      <RowElm>
        <Col
          md={3}
          className="left-sidebar text-center"
        >
          <LeftSidebar />
        </Col>
        <Col
          as="main"
          md={9}
        >
          {children}
        </Col>
      </RowElm>
    </Container>
    <Footer />
  </LayoutElm>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
