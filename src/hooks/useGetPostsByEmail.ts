import { useCallback, useEffect, useState } from "react"
import { PostProps } from "../components/Post/Post"

type useGetPostsByEmailProps = {
  email: string
}
export const useGetPostsByEmail = (email: useGetPostsByEmailProps) => {
  const [posts, setPosts] = useState<Array<PostProps>>([])
  console.log("EMAIL IN HOOK: ", email)
  const getPostsByEmail = useCallback(async () => {
    const result = await fetch(
      `http://localhost:3300/postsbyemail?email=${email}`
    )
    const response = await result.json()
    console.log("WHAT IS RESPOSNT: ", response)
    if (response.success) {
      setPosts(response.result)
    }
  }, [setPosts])

  useEffect(() => {
    getPostsByEmail()
  }, [getPostsByEmail])

  console.log("Email in Hook: posts: ", posts, email)
  return [posts, getPostsByEmail] as const
}
