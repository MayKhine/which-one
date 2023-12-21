import { useState } from "react"
import { Navigate } from "react-router-dom"
import * as stylex from "@stylexjs/stylex"
import { ColorsKey, colors, colorsObj } from "../../styleX/tokens.stylex"
import { motion } from "framer-motion"

export type UserCardProps = {
  _id: string
  name: string
  email: string
  picture: string
  index?: number
  detail?: boolean
}

export const UserCard = ({
  name,
  email,
  picture,
  index,
  detail,
}: UserCardProps) => {
  console.log("USER CARD: ", name)
  // console.log("bgColor: ", bgColor)

  const [navigate, setNavigate] = useState("")
  const userClickHandler = () => {
    const urlStr = `/users/${email}`
    setNavigate(urlStr)
  }

  // const colorArr = [
  //   "yellow",
  //   "green",
  //   "blue",
  //   "pink",
  //   "orange",
  //   "red",
  //   "purple",
  // ] as const
  const colorArr = Object.keys(colorsObj) as Array<ColorsKey>

  return (
    <motion.div
      {...stylex.props(
        userCardStyles.base,
        userCardStyles.dynamicDimention(detail || false),
        userCardStyles.dynamicBgColor(colorArr[index % 7])
      )}
      onClick={userClickHandler}
      whileHover={{
        x: "-3px",
        y: "-3px",
        boxShadow: "3px 3px 0 rgba(0, 0, 0, 1)",
      }}
    >
      <img
        {...stylex.props(userCardStyles.img)}
        src={picture}
        alt="profile pic"
      ></img>
      <div {...stylex.props(userCardStyles.name)}>{name}</div>
      <div>{email}</div>

      {detail && (
        <div>
          <div>Circle </div>

          <hr {...stylex.props(userCardStyles.horizontalLine)}></hr>
          <div>Question</div>

          <hr {...stylex.props(userCardStyles.horizontalLine)}></hr>
          <div>Answers</div>

          <hr {...stylex.props(userCardStyles.horizontalLine)}></hr>
        </div>
      )}

      <div>
        {navigate && <Navigate to={navigate} replace={true}></Navigate>}
      </div>
    </motion.div>
  )
}

const userCardStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width: "20rem",
    // height: "22rem",
    borderRadius: ".5rem",
    border: "2.5px solid black",
    // padding: "1rem",
    // paddingTop: "2rem",
  },
  img: {
    marginTop: "2rem",
    objectFit: "scale-down",
    width: "15rem",
    height: "15rem",
    borderRadius: "0.5rem",
    backgroundColor: colors.offwhite,
    border: "2.5px solid black",
    marginBottom: "1rem",
  },

  dynamicBgColor: (color: ColorsKey) => ({
    // backgroundColor: `colors.${color}`,
    backgroundColor: colors[color],
  }),
  dynamicDimention: (detail: boolean) => ({
    height: detail ? "100%" : "25rem",
    width: detail ? "25rem" : "20rem",
  }),
  name: {
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  horizontalLine: {
    width: "20rem",
    // height: "2px",
    // color: "black",
    border: "1px solid black",
    borderRadius: "5rem",
  },
})
