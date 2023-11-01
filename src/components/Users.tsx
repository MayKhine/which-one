import { useEffect, useState } from "react"
import { User, UserProps } from "./User"
// import { Navigate } from "react-router-dom"
// import { Button } from "../UI/Button"
// import { Header } from "../UI/HeaderBar"
import { MenuBar } from "../UI/MenuBar"
export const Users = () => {
  const [users, setUsers] = useState<Array<UserProps>>([])
  const getUser = async () => {
    const result = await fetch("http://localhost:3300/users")
    const resultJson = await result.json()
    setUsers(resultJson)
    console.log("Users: ", users)
  }

  // const [navigate, setNavigate] = useState(false)
  // const navToHomeButtonHandler = () => {
  //   setNavigate(!navigate)
  // }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <MenuBar></MenuBar>
      {/* <Header>
        <Button onClickFn={navToHomeButtonHandler} text="Home" />
      </Header> */}
      Users Page
      {/* {navigate && <Navigate to="/home" replace={true}></Navigate>} */}
      {users.map((user) => {
        return (
          <User
            key={user._id}
            _id={user._id}
            name={user.name}
            year={user.year}
            id={user.id}
            password={user.password}
            email={user.email}
          />
        )
      })}
    </div>
  )
}
