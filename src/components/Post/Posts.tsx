import { useEffect, useState } from "react"
import { MenuBar } from "../../UI/MenuBar"
import { Post, PostProps } from "./Post"

export const Posts = () => {
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

  return (
    <div>
      <MenuBar />
      This is posts page
      {posts.map((post: PostProps, index) => {
        return (
          <Post
            key={index}
            id={post.id}
            question={post.question}
            userName={post.userName}
            answers={post.answers}
          ></Post>
        )
      })}
    </div>
  )
}
