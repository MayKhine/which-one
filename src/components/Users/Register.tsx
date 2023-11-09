import { useState } from "react"
import { MenuBar } from "../../UI/MenuBar"
import { UserForm } from "./UserForm"

export type NewUserProps = {
  id: number
  name: string
  email: string
  year: number
  password: string
}

export const Register = () => {
  // const [newUser, setNewUser] = useState({})
  const [addUserResult, setAddUserResult] = useState("")

  const registerNewUser = (user: NewUserProps) => {
    console.log("User is in register", user)
    // setNewUser(user)
    const result = addUser(user)
    return result
  }

  const addUser = async (user: NewUserProps) => {
    const result = await fetch("http://localhost:3300/register", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    const response = await result.json()
    setAddUserResult(response.message)
    const responseResult = response.success
    return responseResult
  }

  return (
    <div>
      <MenuBar></MenuBar>
      Register Page
      <div
        onSelect={() => {
          setAddUserResult("")
        }}
      >
        <UserForm registerNewUser={registerNewUser}></UserForm>
      </div>
      <p>{addUserResult}</p>
    </div>
  )
}
