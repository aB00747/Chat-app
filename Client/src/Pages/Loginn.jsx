import { useContext, useState } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";

const Loginn = () => {
    const {
        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
      } = useContext(AuthContext); // set globally
  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "Center",
            paddingTop: "12%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              {/* <h2>{user.name}</h2>  -- show Abhishek name*/}

              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({
                    ...loginInfo,
                    password: e.target.value,
                  })
                }
              />
              {loginError?.error && (
                <Alert variant="danger">
                  <p>{loginError?.errorMessage}</p>
                </Alert>
              )}
              <Button variant="primary" type="submit">
                {isLoginLoading ? "Loging..." : "Login"}
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Loginn;
