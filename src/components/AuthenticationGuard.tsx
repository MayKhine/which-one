import { withAuthenticationRequired } from "@auth0/auth0-react"
import React, { ReactNode } from "react"
import { PageLoader } from "./PageLoader"

type AuthenticationGuardProps = {
  component: any
}
export const AuthenticationGuard = ({
  component,
}: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  })

  return <Component />
}
