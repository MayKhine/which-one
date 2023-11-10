// import { UserProps } from "../components/Users/User"
import { ReactNode } from "react"
import {
  ocean,
  blue,
  darkblue,
  mango,
  persimmon,
  olivegreen,
} from ".././UI/Colors"

type UserPageLayoutProps = {
  userName: string
  children: ReactNode
}
export const UserPageLayout = ({ userName, children }: UserPageLayoutProps) => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          backgroundColor: ocean,
          color: "white",
          minWidth: "250px",
        }}
      >
        Hello {userName}
      </div>
      <div style={{ backgroundColor: blue, width: "100%" }}>{children}</div>
    </div>
  )
}
