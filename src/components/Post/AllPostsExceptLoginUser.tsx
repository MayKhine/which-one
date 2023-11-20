import { useEffect, useState } from "react"
import { Post, PostProps } from "./Post"

type AllPostsExceptLoginUserProps = {
  loginUserEmail?: string
}
export const AllPostsExceptLoginUser = ({
  loginUserEmail,
}: AllPostsExceptLoginUserProps) => {
  const [posts, setPosts] = useState<Array<PostProps>>([])

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetch(
        `http://localhost:3300/posts-except-login-user?userEmail=${loginUserEmail}`
      )

      const response = await result.json()
      if (response.success) {
        setPosts(response.result)
      }
      console.log("result Json: ", response.result)
    }
    getPosts()
  }, [])

  return (
    <div>
      {posts.map((post: PostProps, index) => {
        return (
          <Post
            key={index}
            question={post.question}
            postCreater={post.postCreater}
            answers={post.answers}
          ></Post>
        )
      })}
    </div>
  )
}
