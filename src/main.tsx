import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home.tsx"

import { CreatePost } from "./components/Post/CreatePost.tsx"
import { UserPage } from "./pages/UserPage.tsx"
import { UsersPage } from "./pages/UsersPage.tsx"
import { ColorTest } from "./pages/ColorTest.tsx"

import { Auth0ProviderWithNavigate } from "./components/Auth/Auth0ProviderWithNavigate.tsx"
import { AuthenticationGuard } from "./components/Auth/AuthenticationGuard.tsx"
import { Posts } from "./components/Post/Posts.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<AuthenticationGuard component={Home} />} />
          <Route
            path="/home"
            element={<AuthenticationGuard component={Home} />}
          />
          <Route
            path="/users"
            element={<AuthenticationGuard component={UsersPage} />}
          />
          <Route
            path="/users/:userEmail"
            element={<AuthenticationGuard component={UserPage} />}
          />

          <Route
            path="/posts"
            element={<AuthenticationGuard component={Posts} />}
          />
          <Route
            path="/createpost"
            element={<AuthenticationGuard component={CreatePost} />}
          />

          <Route path="/colortest" element={<ColorTest />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </Router>
  </React.StrictMode>
)
