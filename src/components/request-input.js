import React from "react"
import { Col, Row, Container, Form, Button, InputGroup } from "react-bootstrap"

const handleFormSubmit = async (submitEvent, actionURI) => {
  submitEvent.preventDefault()
  const form = submitEvent.target
  const response = await fetch(
    `${actionURI}/?youtube_url=` + form.elements[0].value
  )
  if (response.status === 200) {
    console.log("call succesful")
  }
}

export default props => {
  return (
    <React.Fragment>
      <Form
        id="youtube_form"
        onSubmit={e =>
          handleFormSubmit(e, process.env.GATSBY_YOUTUBE_DOWNLOAD_ENDPOINT)
        }
      >
        <InputGroup>
          <Form.Control
            name="youtube_url"
            placeholder="Insert your query here"
          ></Form.Control>
          <Button variant="primary">Start</Button>
        </InputGroup>
      </Form>
    </React.Fragment>
  )
}
