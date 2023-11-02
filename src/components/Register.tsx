import { useEffect, useState } from "react"
import { MenuBar } from "../UI/MenuBar"
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

  const registerNewUser = (user: NewUserProps) => {
    console.log("User is in register", user)
    // setNewUser(user)
    addUser(user)
  }

  const addUser = async (user: NewUserProps) => {
    const result = await fetch("http://localhost:3300/register", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    // const response = result.json()
    console.log("result: ", result)
  }

  // useEffect(() => {
  //   const addUser = async () => {
  //     const result = await fetch("http://localhost:3300/register", {
  //       method: "Post",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newUser),
  //     })
  //     const response = result.json()
  //     console.log("Response: ", response)
  //   }
  //   if (newUser) {
  //     addUser()
  //   }
  // }, [newUser])

  return (
    <div>
      <MenuBar></MenuBar>
      Register Page
      <UserForm registerNewUser={registerNewUser}></UserForm>
    </div>
  )
}
