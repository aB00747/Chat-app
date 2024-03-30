import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

const Register = () => {
  return (
    <>
      <Form>
        <Row
          style={{
            height: "100vh",
            justifyContent: "Center",
            paddingTop: "12%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>

              <Form.Control type="text" placeholder="Name" />
              <Form.Control type="email" placeholder="Email" />
              <Form.Control type="password" placeholder="Password" />
              <Alert variant="danger">
                <p>Ooh Something went wrong !!</p>
              </Alert>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
