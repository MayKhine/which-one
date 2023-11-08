import { useState } from "react"
import { Button } from "../../UI/Button"
import { Navigate } from "react-router-dom"
import { ocean } from "../../UI/Colors"
export type UserProps = {
  _id: string
  name: string
  email: string
  id: number
  year: number
  password: string
}

export const User = ({ name, email, id, year, password }: UserProps) => {
  const [navigate, setNavigate] = useState("")

  const userClickHandler = () => {
    console.log("This user is selected: ", name)
    const urlStr = `/users/${name}`
    console.log("URL Str: ", urlStr)
    setNavigate(urlStr)
  }

  return (
    <div style={{ backgroundColor: "lightblue" }}>
      <Button
        text={name}
        type="submit"
        onClickFn={userClickHandler}
        bgColor={ocean}
      ></Button>
      <p>{id}</p>
      <p>{email}</p>
      <p>{year}</p>
      <p>{password}</p>
      <div>
        {navigate && <Navigate to={navigate} replace={true}></Navigate>}
      </div>
    </div>
  )
}
