import { Post, PostProps } from "./Post"
import img from "../../img/profilePic.png"
import { useAuth0 } from "@auth0/auth0-react"

type PostsProps = {
  posts: Array<PostProps>
}
export const Posts = ({ posts }: PostsProps) => {
  const { isAuthenticated, user } = useAuth0()
  console.log("Is ", isAuthenticated, user)

  return (
    <div>
      This is evryone's posts
      {posts.map((post: PostProps, index) => {
        return (
          // <Post
          //   key={index}
          //   postCreater={post.postCreater}
          //   postCreaterPic={post?.postCreaterInfo[0]?.picture || img}
          //   question={post.question}
          //   answerType={post.answerType}
          //   answers={post.answers}
          //   voting={post.voting}
          // ></Post>
          <div style={{ backgroundColor: "lightblue", marginBottom: "2rem" }}>
            <p>{post.postCreater}</p>
            <p>{post.question}</p>
            <p>
              {post.answers?.map((ans) => {
                return <div>{ans}</div>
              })}
            </p>
          </div>
        )
      })}
    </div>
  )
}
