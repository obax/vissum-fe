import React from "react"
import { Col, Row, Container, Form, Button } from "react-bootstrap"

export default props => {
  return (
    <React.Fragment>
      <Form>
        <Form.Group>
          <Form.Control placeholder="Insert your query here"></Form.Control>
          <Button variant="primary">Start</Button>
        </Form.Group>
      </Form>
    </React.Fragment>
  )
}
