import { Button } from "../../UI/Button"
import { PostProps } from "./Post"
type PostByUserProps = {
  post: PostProps
}
export const PostByUser = ({ post }: PostByUserProps) => {
  const deletePostHandler = () => {
    console.log("Delete Post Handler is called")
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
