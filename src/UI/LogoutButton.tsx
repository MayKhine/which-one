import { useAuth0 } from "@auth0/auth0-react"
import { MenuButton } from "./MenuButton"
export const LogoutButton = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  return <MenuButton onClickFn={handleLogout} text="LOG OUT" />
}
