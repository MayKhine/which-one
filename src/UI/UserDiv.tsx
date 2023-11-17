import { ocean, persimmon } from "./Colors"
type UserDivProps = {
  name: string
  email: string
  pic: string
}

export const UserDiv = ({ name, email, pic }: UserDivProps) => {
  return (
    <div
      style={{
        maxWidth: "300px",
        backgroundColor: ocean,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img src={pic} style={{ borderRadius: "50%", maxWidth: "150px" }}></img>
      <div>{name}</div>
      <div>{email}</div>
    </div>
  )
}
