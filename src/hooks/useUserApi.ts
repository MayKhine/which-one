import { useEffect, useState } from "react"
import { UserProps } from "../components/Users/UserCard"
import { useAuth0 } from "@auth0/auth0-react"

export type useUserProps = {
  name: string
}

export const useUserApi = () => {
  const { user } = useAuth0()

  console.log("User USERAPI: ", user)
  const userEmail = user?.email

  const [userDB, setUserDB] = useState<UserProps>()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getUser = async () => {
      const user = await fetch(`http://localhost:3300/users/${userEmail}`, {
        method: "Get",
      })
      setIsLoading(true)
      const response = await user.json()

      setIsLoading(false)
      setUserDB(response.result)
    }
    getUser()
  }, [userEmail])
  console.log("USER DB: ", userDB)
  return { user, isLoading }
}
