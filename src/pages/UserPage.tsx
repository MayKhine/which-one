import { useEffect, useState } from "react"
import { PostProps } from "../components/Post/Post"
import { MenuBar } from "../UI/MenuBar"
import { useParams } from "react-router-dom"
import { NoUser } from "../components/Users/NoUser"

export const UserPage = () => {
  const [userExists, setUserExists] = useState<boolean>()
  const [posts, setPosts] = useState()
  const { userName } = useParams<{ userName: string }>()

  useEffect(() => {
    const checkUserExist = async () => {
      const result = await fetch(`http://localhost:3300/users/${userName}`, {
        method: "Get",
      })

      const response = await result.json()
      setUserExists(response.success)
    }

    const getPostsByUser = async () => {
      const result = await fetch(
        `http://localhost:3300/users/${userName}/posts`,
        {
          method: "Get",
        }
      )
      const response = await result.json()
      setPosts(response.result)
    }

    checkUserExist()
    if (userExists) {
      getPostsByUser()
    }
  }, [userName, userExists])

  return (
    <div>
      <MenuBar />
      User Page
      {userExists &&
        posts?.map((post: PostProps, index: number) => {
          return (
            <div key={index}>
              {post.userName}
              {post.question}
            </div>
          )
        })}
      {!userExists && <NoUser userName={userName} />}
    </div>
  )
}
