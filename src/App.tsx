// import { useState } from "react"
// import { Navigate } from "react-router-dom"
// import { Button } from "./UI/Button"
// import { Header } from "./UI/HeaderBar"
import { MenuBar } from "./UI/MenuBar"

function App() {
  // const [navigate, setNavigate] = useState(false)
  // const navToUsersButtonHandler = () => {
  //   setNavigate(!navigate)
  // }
  return (
    <div>
      <MenuBar></MenuBar>
      {/* <Header>
        <Button onClickFn={navToUsersButtonHandler} text="Users Page" />
      </Header> */}
      This is Home Page
      {/* {navigate && <Navigate to="/users" replace={true}></Navigate>} */}
    </div>
  )
}

export default App
