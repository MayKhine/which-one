import { ocean, persimmon } from "./Colors"
import { ProfileImg } from "./ProfilePic"
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
      {/* <img src={pic} style={{ borderRadius: "50%", maxWidth: "150px" }}></img> */}
      <ProfileImg image={pic} size="120px" />
      <div>{name}</div>
      <div>{email}</div>
    </div>
  )
}
