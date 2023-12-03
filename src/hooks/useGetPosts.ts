import { useEffect, useState } from "react"
import { PostProps } from "../components/Post/Post"

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Array<PostProps>>([])

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetch("http://localhost:3300/posts")
      const response = await result.json()
      if (response.success) {
        setPosts(response.result)
      }
      console.log("result Json: ", response)
    }
    getPosts()
  }, [])

  return [posts]
}
