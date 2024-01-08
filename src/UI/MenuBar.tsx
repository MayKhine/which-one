import { ChangeEvent, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthButtons } from "./AuthButtons"
import { MenuButton } from "./MenuButton"
import * as stylex from "@stylexjs/stylex"
import { textStyles } from "../styleX/textStyles"

const menuStyles = stylex.create({
  logo: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: ".3rem",
  },
  base: {
    display: "flex",
    justifyContent: "space-between",

    alignItems: "center",

    "@media (max-width: 800px)": {
      backgroundColor: "red",
    },
  },

  menu: {
    display: "flex",
    alignItems: "center",
  },
})

export const MenuBar = () => {
  const [navigate, setNavigate] = useState("")
  const navButtonHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const urlStr = "/".concat(event.target.innerHTML.trim())
    setNavigate(urlStr)
  }

  return (
    <div {...stylex.props(menuStyles.base)}>
      <div {...stylex.props(menuStyles.logo)}>WHICH ONE</div>

      <div {...stylex.props(menuStyles.menu)}>
        <div>
          {/* <input
            {...stylex.props(textStyles.searchInput)}
            type="text"
            placeholder="Search.."
          ></input> */}
          <MenuButton onClickFn={navButtonHandler} text="home" />
          <MenuButton onClickFn={navButtonHandler} text="users" />
          <MenuButton onClickFn={navButtonHandler} text="profile" />
        </div>
        <AuthButtons />
      </div>
      {navigate && <Navigate to={navigate} replace={true}></Navigate>}
    </div>
  )
}
