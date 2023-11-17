import { MenuBar } from "./UI/MenuBar"
import { useAuth0 } from "@auth0/auth0-react"
import { UserDiv } from "./UI/UserDiv"
export const Home = () => {
  const { isAuthenticated, user } = useAuth0()
  console.log("Is ", isAuthenticated, user)
  console.log("HOMMEE")

  return (
    <div>
      <MenuBar></MenuBar>
      <UserDiv name={user?.nickname} email={user?.email} pic={user?.picture} />
    </div>
  )
}
