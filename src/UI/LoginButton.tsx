import { useAuth0 } from "@auth0/auth0-react"
import { MenuButton } from "./MenuButton"
export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/users",
      },
    })
  }

  return (
    // <button className="button__login" onClick={handleLogin}>
    //   Log In
    // </button>
    <MenuButton text="LOG IN" onClickFn={handleLogin} />
  )
}
