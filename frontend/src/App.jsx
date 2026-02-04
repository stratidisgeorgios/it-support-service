import { Routes, Route } from "react-router-dom";
import "./App.css";
import Post from "./components/Post.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Layout from "./components/Layout.jsx";
import Missing from "./components/Missing.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import RequireAuth from "./components/RequireAuth.js";
import Admin from "./components/Admin.jsx";
import Editor from "./components/Editor.jsx";
import Lounge from "./components/Lounge.jsx";
import Unauthorized from "./components/Unauthorized.js";

const ROLES = {
  User: "User",
  Editor: "Editor",
  Admin: "Admin",
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />a
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/about" element={<About />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
        >
          <Route path="lounge" element={<Lounge />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
