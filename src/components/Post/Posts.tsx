import { useEffect, useState } from "react"
import { Post, PostProps } from "./Post"
import img from "../../img/profilePic.png"
import { useAuth0 } from "@auth0/auth0-react"
export const Posts = () => {
  const [posts, setPosts] = useState<Array<PostProps>>([])
  const { isAuthenticated, user } = useAuth0()
  console.log("Is ", isAuthenticated, user)

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

  // show other poe

  return (
    <div>
      This is evryone's posts
      {posts.map((post: PostProps, index) => {
        return (
          <Post
            key={index}
            postCreater={post.postCreater}
            postCreaterPic={post?.postCreaterInfo[0]?.picture || img}
            question={post.question}
            answerType={post.answerType}
            answers={post.answers}
            voting={post.voting}
          ></Post>
        )
      })}
    </div>
  )
}
