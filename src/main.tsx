import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./App.tsx"
import { Register } from "./components/Users/Register.tsx"
import { Posts } from "./components/Post/Posts.tsx"
import { CreatePost } from "./components/Post/CreatePost.tsx"
import { UserPage } from "./pages/UserPage.tsx"
import { UsersPage } from "./pages/UsersPage.tsx"
import { ColorTest } from "./pages/ColorTest.tsx"
// import { Users } from "./components/Users/Users.tsx"
// import { Auth0Provider } from "@auth0/auth0-react"

import { Auth0ProviderWithNavigate } from "./Auth0ProviderWithNavigate.tsx"
import { AuthenticationGuard } from "./components/AuthenticationGuard.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <Routes>
          {/* <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userName" element={<UserPage />} />

          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/createpost" element={<CreatePost />} /> */}
          <Route path="/" element={<AuthenticationGuard component={App} />} />
          <Route
            path="/home"
            element={<AuthenticationGuard component={App} />}
          />
          <Route
            path="/users"
            element={<AuthenticationGuard component={UsersPage} />}
          />
          <Route
            path="/users/:userName"
            element={<AuthenticationGuard component={UserPage} />}
          />

          <Route
            path="/register"
            element={<AuthenticationGuard component={Register} />}
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
