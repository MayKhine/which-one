import { useState } from "react"
import { Button } from "./Button"
import { Navigate } from "react-router-dom"
import { useUserApi } from "../hooks/useUserApi"
export const MenuBar = () => {
  const { user } = useUserApi("user1")
  const userName = user?.name

  const [navigate, setNavigate] = useState("")
  const navButtonHandler = (event: any) => {
    const urlStr = "/".concat(event.target.innerHTML.trim())
    console.log("URL Str: ", urlStr)
    setNavigate(urlStr)
  }

  return (
    <div style={{ backgroundColor: "pink" }}>
      <Button onClickFn={navButtonHandler} text="Home" />
      <Button onClickFn={navButtonHandler} text="Users" />
      <Button onClickFn={navButtonHandler} text="Register" />
      <Button onClickFn={navButtonHandler} text="Posts" />
      <Button onClickFn={navButtonHandler} text="CreatePost" />
      <p>Current User: {userName}</p>
      {navigate && <Navigate to={navigate} replace={true}></Navigate>}
    </div>
  )
}
