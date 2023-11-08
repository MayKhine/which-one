import { useEffect, useState } from "react"
import { User, UserProps } from "./User"

export const Users = () => {
  const [users, setUsers] = useState<Array<UserProps>>([])

  useEffect(() => {
    const getUsers = async () => {
      const result = await fetch("http://localhost:3300/users")
      const resultJson = await result.json()
      setUsers(resultJson)
    }
    getUsers()
  }, [])

  return (
    <div>
      {users.map((user) => {
        return (
          <User
            key={user._id}
            _id={user._id}
            name={user.name}
            year={user.year}
            id={user.id}
            password={user.password}
            email={user.email}
          />
        )
      })}
    </div>
  )
}
