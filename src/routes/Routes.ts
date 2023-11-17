import App from "../Home"
import { Users } from "../components/Users/Users"
import { Route, Routes } from "react-router-dom"

export const AppRoutes = (
  return <Routes>
    <Route path="/home" element={<App />} />
    <Route path="/users" element={<Users />} />
  </Routes>
)
