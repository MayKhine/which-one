import { useAuth0 } from "@auth0/auth0-react"
// import { LoginButton } from "../../buttons/login-button"
// import { LogoutButton } from "../../buttons/logout-button"
// import { SignupButton } from "../../buttons/signup-button"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { SignupButton } from "./SignupButton"
export const NavBarButtons = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0()
  console.log(
    isAuthenticated,
    "Loginwith Redir: ",
    loginWithRedirect,
    "User: ",
    user,
    "IsLoaging: ",
    isLoading
  )
  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
          {/* <SignupButton /> */}
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
