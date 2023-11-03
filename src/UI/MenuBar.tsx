import { useState } from "react"
import { Button } from "./Button"
import { Navigate } from "react-router-dom"

export const MenuBar = () => {
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

      {navigate && <Navigate to={navigate} replace={true}></Navigate>}
    </div>
  )
}
