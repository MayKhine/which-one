import { withAuthenticationRequired } from "@auth0/auth0-react"
import { ReactNode } from "react"
import { PageLoader } from "../PageLoader"

type AuthenticationGuardProps = {
  component: ReactNode
  // children: ReactNode
}

export const AuthenticationGuard = ({
  component,
}: // children,
AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  })

  return <Component />
}
