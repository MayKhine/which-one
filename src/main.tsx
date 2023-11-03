import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./App.tsx"
import { Users } from "./components/Users.tsx"
import { Register } from "./components/Register.tsx"
import { Posts } from "./components/Posts.tsx"
import { CreatePost } from "./components/CreatePost.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
