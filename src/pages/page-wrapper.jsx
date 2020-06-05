import React from 'react'
import { Card } from 'react-bootstrap'

import Layout from '@components/layout'
import SEO from '@components/seo'

const PageWrapper = ({ title, pathname, children }) => (
  <Layout>
    <SEO title={title} pathname={pathname} />
    <Card border="light" className="px-4 pt-3">
      <Card.Title as="h2" className="font-weight-bold">{title}</Card.Title>
      {children}
    </Card>
  </Layout>
)

export default PageWrapper
