import { useAuth0 } from "@auth0/auth0-react"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
export const AuthButtons = () => {
  const { isAuthenticated, user } = useAuth0()

  const checkUserInDb = async (user: string) => {
    // console.log("USER: ", user)
    // const result =
    await fetch("http://localhost:3300/register", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    // const response = await result.json()

    // const responseResult = response
    // console.log("RESPONSE RESULT: ", responseResult)
  }

  checkUserInDb(user)

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
