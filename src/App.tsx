import { useEffect, useState } from "react"
import classes from "./App.module.css"
import { User, UserProps } from "./components/User"

function App() {
  const [users, setUsers] = useState<Array<UserProps>>([])

  const getUser = async () => {
    const result = await fetch("http://localhost:3300/users")
    const resultJson = await result.json()

    setUsers(resultJson)
    console.log("Users: ", users)
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className={classes.main}>
      Hello hello
      {users.map((user) => {
        return (
          <User
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

export default App
