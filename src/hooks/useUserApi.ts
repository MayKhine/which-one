import { useEffect, useState } from "react"
import { UserProps } from "../components/Users/User"

export type useUserProps = {
  name: string
}

export const useUserApi = (userName: string) => {
  const [user, setUser] = useState<UserProps>()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getUser = async () => {
      const user = await fetch(`http://localhost:3300/users/${userName}`, {
        method: "Get",
      })
      setIsLoading(true)
      const response = await user.json()

      setIsLoading(false)
      setUser(response.result)
    }
    getUser()
  }, [userName])

  return { user, isLoading }
}
