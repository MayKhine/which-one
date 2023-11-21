import { useEffect, useState } from "react"
import { Post, PostProps } from "./Post"
// import profilePic from "../components/img/profilePic.png"
import img from "../../img/profilePic.png"
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
      This is posts components
      {posts.map((post, index) => {
        console.log("What is in post: ", post.postCreater)
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
