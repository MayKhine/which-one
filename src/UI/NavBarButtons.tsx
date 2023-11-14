import { useAuth0 } from "@auth0/auth0-react"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
export const NavBarButtons = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0()
  // console.log(
  //   isAuthenticated,
  //   "Loginwith Redir: ",
  //   loginWithRedirect,
  //   "User: ",
  //   user,
  //   JSON.stringify(user, null, 2),
  //   isLoading
  // )
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
