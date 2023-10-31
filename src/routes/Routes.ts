import App from "../App"
import { Users } from "../components/Users"
import { Route, Routes } from "react-router-dom"

export const AppRoutes = (
  return <Routes>
    <Route path="/home" element={<App />} />
    <Route path="/users" element={<Users />} />
  </Routes>
)
