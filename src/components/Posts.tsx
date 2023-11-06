import { useEffect, useState } from "react"
import { MenuBar } from "../UI/MenuBar"
import { Post, PostProps } from "./Post"

export const Posts = () => {
  const [posts, setPosts] = useState<Array<PostProps>>([])

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetch("http://localhost:3300/posts")
      console.log("result: ", result)
      const resultJson = await result.json()
      setPosts(resultJson)
      console.log("Posts : ", resultJson)
    }
    getPosts()
  }, [])

  return (
    <div>
      <MenuBar />
      This is posts page
      {posts.map((post: PostProps) => {
        return (
          <Post
            key={post.id}
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
