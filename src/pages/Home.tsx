import { MenuBar } from "../UI/MenuBar"
import { useAuth0 } from "@auth0/auth0-react"
import { UserDiv } from "../UI/UserDiv"
import { Posts } from "../components/Post/Posts"
import { Button } from "../UI/Button"
// import { CreatePost } from "../components/Post/CreatePost"
import { useState } from "react"
import { PostForm } from "../components/Post/PostForm"
export const Home = () => {
  const { user } = useAuth0()
  const [createPost, setCreatePost] = useState(false)
  const createPostHandler = () => {
    console.log("Create post is clicked")
    setCreatePost(!createPost)
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "gray" }}>
      <MenuBar />
      <div
        style={{
          height: "calc(100% - 70px)",
          backgroundColor: "lightgray",
          display: "flex",
        }}
      >
        <UserDiv
          width="250px"
          name={user?.nickname}
          email={user?.email}
          pic={user?.picture}
        />
        <div style={{ width: "100vw" }}>
          <div style={{ backgroundColor: "lightyellow" }}>
            {!createPost && (
              <div>
                <div> What's your question? </div>
                {/* <input type="text" onChange={createPostHandler}></input> */}
                <Button
                  type="submit"
                  text="Add a new post"
                  onClickFn={createPostHandler}
                />
              </div>
            )}
            {createPost && (
              <div>
                <PostForm />
              </div>
            )}
          </div>
          <Posts />
        </div>
      </div>
    </div>
  )
}
