import { Button } from "../../UI/Button"
import { PostProps } from "./Post"
import { useUserApi } from "../../hooks/useUserApi"

type PostByUserProps = {
  post: PostProps
}

export const PostByUser = ({ post }: PostByUserProps) => {
  const { user } = useUserApi("user1")
  const userName = user?.name

  const deletePost = async () => {
    const result = await fetch(
      `http://localhost:3300/users/${userName}/posts/${post.id}?delete=true`,
      {
        method: "Delete",
      }
    )
    const response = await result
    console.log("Delete Response: ", response)
  }

  const deletePostHandler = () => {
    console.log("Delete Post Handler is called")
    if (userName == post.userName) {
      console.log("Delete Post Handler")
      deletePost()
    } else {
      console.log("Cancel Delete Post Handler")
    }
  }
  return (
    <div>
      <div>
        <p>{post.question} </p>
        {post.answers?.map((ans, index) => {
          return <li key={index}> {ans}</li>
        })}
      </div>
      <Button type="submit" text="x" onClickFn={deletePostHandler} />
    </div>
  )
}
