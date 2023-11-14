import { useAuth0 } from "@auth0/auth0-react"

export const CurrentUser = () => {
  const { user } = useAuth0()

  console.log("USER: ", user)
  const userEmail = user?.email
  const getUser = async () => {
    const user = await fetch(`http://localhost:3300/users/${userEmail}`, {
      method: "Get",
    })
    const response = await user.json()
    return response.result
  }
  const userFromDB = getUser()
  console.log("userFromDB: ", userFromDB)
  return { getUser }
}

export const getCurrentUser = () => {}
