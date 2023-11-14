import { Auth0Provider } from "@auth0/auth0-react"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import configJson from "../../../auth_config.json"
import { useAuth0 } from "@auth0/auth0-react"

type Auth0ProviderWithNavigateProps = {
  children: ReactNode
}

// export const AuthVal = () => {
//   const { isAuthenticated, user } = useAuth0()
//   return isAuthenticated, user
// }

export const Auth0ProviderWithNavigate = ({
  children,
}: Auth0ProviderWithNavigateProps) => {
  const { user } = useAuth0()

  const navigate = useNavigate()

  const domain = configJson.REACT_APP_AUTH0_DOMAIN
  const clientId = configJson.REACT_APP_AUTH0_CLIENT_ID
  const redirectUri = configJson.REACT_APP_AUTH0_CALLBACK_URL
  // const audience = configJson.REACT_APP_AUTH0_AUDIENCE

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && redirectUri)) {
    return null
  }

  // add user to db if it has not exist yet
  console.log("TO DO: add user to DB ")
  const checkUserInDb = async (user) => {
    const result = await fetch("http://localhost:3300/register", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    const response = await result.json()

    const responseResult = response
    console.log("RESPONSE RESULT: ", responseResult)
  }
  checkUserInDb(user)

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        // audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
