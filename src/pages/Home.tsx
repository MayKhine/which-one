import { MenuBar } from "../UI/MenuBar"
import { useAuth0 } from "@auth0/auth0-react"
import { UserDiv } from "../UI/UserDiv"
import { Posts } from "../components/Post/Posts"
import { Button } from "../UI/Button"
import { CreatePost } from "../components/Post/CreatePost"
import { useState } from "react"

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
          {!createPost && (
            <Button
              type="submit"
              text="Add a new post"
              onClickFn={createPostHandler}
            />
          )}
          {createPost && (
            <div>
              <CreatePost />
            </div>
          )}
          <Posts />
        </div>
      </div>
    </div>
  )
}
