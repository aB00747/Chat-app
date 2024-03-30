import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./Pages/Chat";
import Register from "./Pages/Register";
import Login from "./Pages/Loginn";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* Make default route if not found any path it will redirect at this */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </>
  );
}

export default App;
