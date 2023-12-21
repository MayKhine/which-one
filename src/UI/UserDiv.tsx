import * as stylex from "@stylexjs/stylex"

type UserDivProps = {
  name: string
  email: string
  pic: string
  width?: string
}

export const UserDiv = ({ name, email, pic, width }: UserDivProps) => {
  return (
    <div {...stylex.props(userDivStyles.base)}>
      <img {...stylex.props(userDivStyles.img)} src={pic} alt="profile picture">
        {/* <ProfilePic image={pic} size="200px" /> */}
      </img>

      <div>{name}</div>
      <div>{email}</div>
    </div>
  )
}

const userDivStyles = stylex.create({
  base: {
    backgroundColor: "lightgray",
    width: "25rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2.5px solid black",
    borderRadius: "0.5rem",
  },
  img: {
    padding: "1rem",
  },
})
