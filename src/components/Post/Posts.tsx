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
      {posts.map((post: PostProps, index) => {
        return (
          <Post
            key={index}
            index={index}
            id={post.id}
            postCreater={post.postCreater}
            postCreaterInfo={post.postCreaterInfo}
            question={post.question}
            answers={post.answers}
            images={post.images}
            voting={post.voting}
          ></Post>
        )
      })}
    </div>
  )
}
