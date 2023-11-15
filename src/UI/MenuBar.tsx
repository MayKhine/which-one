import { ChangeEvent, useState } from "react"
import { Button } from "./Button"
import { Navigate } from "react-router-dom"
import { useUserApi } from "../hooks/useUserApi"
import { AuthButtons } from "./AuthButtons"
export const MenuBar = () => {
  // const { user } = useUserApi()
  // const userName = user?.name

  const [navigate, setNavigate] = useState("")
  const navButtonHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const urlStr = "/".concat(event.target.innerHTML.trim())
    console.log("URL Str: ", urlStr)
    setNavigate(urlStr)
  }

  return (
    <div style={{ backgroundColor: "pink" }}>
      <Button onClickFn={navButtonHandler} text="home" />
      <Button onClickFn={navButtonHandler} text="users" />
      {/* <Button onClickFn={navButtonHandler} text="register" /> */}
      <Button onClickFn={navButtonHandler} text="posts" />
      <Button onClickFn={navButtonHandler} text="createpost" />
      <Button onClickFn={navButtonHandler} text="colortest" />

      <AuthButtons />
      {/* <p>Current User: {userName}</p> */}
      {navigate && <Navigate to={navigate} replace={true}></Navigate>}
    </div>
  )
}
