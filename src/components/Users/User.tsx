import { useState } from "react"
import { Button } from "../../UI/Button"
import { Navigate } from "react-router-dom"
import { ocean } from "../../UI/Colors"
export type UserProps = {
  _id: string
  name: string
  email: string
}

export const User = ({ name, email }: UserProps) => {
  const [navigate, setNavigate] = useState("")

  const userClickHandler = () => {
    console.log("This user is selected: ", name)
    const urlStr = `/users/${name}`
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
      <p>{email}</p>

      <div>
        {navigate && <Navigate to={navigate} replace={true}></Navigate>}
      </div>
    </div>
  )
}
