import { ChangeEvent, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthButtons } from "./AuthButtons"
import { MenuButton } from "./MenuButton"
import { colors } from "./Colors"
export const MenuBar = () => {
  const [navigate, setNavigate] = useState("")
  const navButtonHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const urlStr = "/".concat(event.target.innerHTML.trim())
    setNavigate(urlStr)
  }

  return (
    <div
      style={{
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontWeight: "800",
          fontSize: "3rem",
          marginLeft: "1.5rem",
        }}
      >
        WHICH ONE
      </div>

      <div
        style={{
          display: "flex",
          alignSelf: "center",
          marginRight: ".5rem",
        }}
      >
        <div>
          <input
            style={searchBarStyle}
            type="text"
            placeholder="Search.."
          ></input>
          <MenuButton onClickFn={navButtonHandler} text="HOME" />
          <MenuButton onClickFn={navButtonHandler} text="USERS" />
          <MenuButton onClickFn={navButtonHandler} text="COLOR" />
        </div>
        <AuthButtons />
      </div>
      {navigate && <Navigate to={navigate} replace={true}></Navigate>}
    </div>
  )
}

const searchBarStyle = {
  backgroundColor: colors.yellow,
  height: "2rem",
  width: "17rem",
  border: ".2rem solid black",
  borderRadius: "0.4rem",
  paddingLeft: ".5rem",
  marginRight: "0.5rem",
}
