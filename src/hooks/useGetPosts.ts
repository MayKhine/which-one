import { useCallback, useEffect, useState } from "react"
import { PostProps } from "../components/Post/Post"

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Array<PostProps>>([])

  const getPosts = useCallback(async () => {
    const result = await fetch("http://localhost:3300/posts")
    const response = await result.json()
    if (response.success) {
      setPosts(response.result)
    }
  }, [setPosts])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  return [posts, getPosts] as const
}
