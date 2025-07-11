import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<CreateBlog />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
