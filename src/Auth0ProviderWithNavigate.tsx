import { Auth0Provider } from "@auth0/auth0-react"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import configJson from "../auth_config.json"
import { useAuth0 } from "@auth0/auth0-react"

type Auth0ProviderWithNavigateProps = {
  children: ReactNode
}

export const AuthVal = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
}

export const Auth0ProviderWithNavigate = ({
  children,
}: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate()

  // const domain = process.env.REACT_APP_AUTH0_DOMAIN
  // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  // const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL

  const domain = configJson.REACT_APP_AUTH0_DOMAIN
  const clientId = configJson.REACT_APP_AUTH0_CLIENT_ID
  const redirectUri = configJson.REACT_APP_AUTH0_CALLBACK_URL

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && redirectUri)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
