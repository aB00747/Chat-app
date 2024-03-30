import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./Pages/Chat";
import Register from "./Pages/Register";
import Login from "./Pages/Loginn";
import NavBar from "./Component/NavBar";
import "bootstrap/dist/css/bootstrap.min.css"; // inport  bootstrap css file. we can use bootstrp css with classname.
import { Container } from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <NavBar />
    <Container className="text-secondary"> 
      <Routes>
        <Route path="/" element={<Chat />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* Make default route if not found any path it will redirect at this */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
    </>
  );
}

export default App;
