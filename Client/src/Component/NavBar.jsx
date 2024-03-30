import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" style={{ height: "3.75em" }}>
      Nav
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            Chat-App
          </Link>
        </h2>
        <span className="text-success">Logged in as Keta</span>
        <Nav>
          <Stack direction="horizontal" gap={3} >
            <Link to="/login" className="link-light text-decoration-none">
              Login
            </Link>
            <Link to="/register" className="link-light text-decoration-none">
              Register
            </Link>
            <Link to="/logout" className="link-light text-decoration-none">
              Logout
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
