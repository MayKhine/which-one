import { ocean, persimmon } from "./Colors"
import { ProfilePic } from "./ProfilePic"
type UserDivProps = {
  name: string
  email: string
  pic: string
  width: string
}

export const UserDiv = ({ name, email, pic, width }: UserDivProps) => {
  return (
    <div
      style={{
        width: width,
        height: "100%",
        backgroundColor: ocean,
        color: "white",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProfilePic image={pic} size="120px" />
      <div>{name}</div>
      <div>{email}</div>
    </div>
  )
}
