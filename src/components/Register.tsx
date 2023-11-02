import { MenuBar } from "../UI/MenuBar"
import { UserForm } from "./UserForm"

export type NewUserProps = {
  name: string
  email: string
  year: number
  password: string
}

export const Register = () => {
  const registerNewUser = (user: NewUserProps) => {
    console.log("User is in register", user)
  }
  return (
    <div>
      <MenuBar></MenuBar>
      Register Page
      <UserForm registerNewUser={registerNewUser}></UserForm>
    </div>
  )
}
