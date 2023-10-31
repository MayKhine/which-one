import { useState } from "react"
import { Navigate } from "react-router-dom"

function App() {
  const [navigate, setNavigate] = useState(false)
  const buttonHandler = () => {
    setNavigate(!navigate)
  }
  return (
    <div>
      This is home page
      <button onClick={buttonHandler}>Go to Users Page</button>
      {navigate && <Navigate to="/users" replace={true}></Navigate>}{" "}
    </div>
  )
}

export default App
