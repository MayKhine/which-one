import { Post, PostProps } from "./Post"
// import { useAuth0 } from "@auth0/auth0-react"

type PostsProps = {
  posts: Array<PostProps>
}
export const Posts = ({ posts }: PostsProps) => {
  // const { isAuthenticated, user } = useAuth0()
  // console.log("Is ", isAuthenticated, user)

  const sortByCreateTimeDesc = (posts) => {
    const sorted = posts.sort((a, b) => {
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    })
    return sorted
  }

  const sortedPosts = sortByCreateTimeDesc(posts)

  return (
    <div>
      {sortedPosts.map((post: PostProps, index) => {
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
            createTime={post.createTime}
          ></Post>
        )
      })}
    </div>
  )
}
