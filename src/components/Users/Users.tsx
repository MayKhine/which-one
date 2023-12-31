import { useEffect, useState } from "react"
import { User, UserProps } from "./UserCard"

export const Users = () => {
  const [users, setUsers] = useState<Array<UserProps>>([])

  useEffect(() => {
    const getUsers = async () => {
      const result = await fetch("http://localhost:3300/users")
      const resultJson = await result.json()
      setUsers(resultJson)
      // console.log("Users: ", users)
    }
    getUsers()
  }, [])

  return (
    <div>
      Users Page
      {users.map((user) => {
        return (
          <User
            key={user._id}
            _id={user._id}
            name={user.name}
            email={user.email}
          />
        )
      })}
    </div>
  )
}
