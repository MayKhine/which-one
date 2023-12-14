import { Post, PostProps } from "./Post"
// import { useAuth0 } from "@auth0/auth0-react"

type PostsProps = {
  posts: Array<PostProps>
}
export const Posts = ({ posts }: PostsProps) => {
  // const { isAuthenticated, user } = useAuth0()
  // console.log("Is ", isAuthenticated, user)

  return (
    <div>
      This is evryone's posts
      {posts.map((post: PostProps, index) => {
        return (
          <Post
            key={index}
            postCreater={post.postCreater}
            postCreaterInfo={post.postCreaterInfo}
            // postCreaterPic={post.postCreaterInfo[0]?.picture || img}
            question={post.question}
            answers={post.answers}
            images={post.images}
          ></Post>
        )
      })}
    </div>
  )
}
