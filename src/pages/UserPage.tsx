import { useEffect, useState } from "react"
import { PostProps } from "../components/Post/Post"

type UserPageProps = {
  userName: string
}
export const UserPage = ({ userName }: UserPageProps) => {
  const [posts, setPosts] = useState()

  useEffect(() => {
    const getPostsByUser = async () => {
      const result = await fetch(
        `http://localhost:3300/users/${userName}/posts`,
        {
          method: "Get",
        }
      )
      const response = await result.json()
      setPosts(response.result)
      console.log("RESPONSE: ", response.result)
    }
    getPostsByUser()
  }, [userName])

  return (
    <div>
      User Page
      {posts?.map((post: PostProps, index: number) => {
        return (
          <div key={index}>
            {post.userName}
            {post.question}
          </div>
        )
      })}
    </div>
  )
}
