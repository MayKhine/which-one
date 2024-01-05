import { User, useAuth0 } from "@auth0/auth0-react"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { useEffect } from "react"

export const AuthButtons = () => {
  const { isAuthenticated, user } = useAuth0()

  useEffect(() => {
    user && checkUserInDb(user)
  }, [user])

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  )
}

const checkUserInDb = async (user: User) => {
  console.log("** checkUserInDb : ", user)

  await fetch("http://localhost:3300/register", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}
