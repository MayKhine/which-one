import { MenuBar } from "../UI/MenuBar"
import { useAuth0 } from "@auth0/auth0-react"
import { UserDiv } from "../UI/UserDiv"
import { Posts } from "../components/Post/Posts"
import { Button } from "../UI/Button"
// import { CreatePost } from "../components/Post/CreatePost"
import { useState } from "react"
import { PostForm, enteredValuesType } from "../components/Post/PostForm"
import { useGetPosts } from "../hooks/useGetPosts"
export const Home = () => {
  const { user } = useAuth0()
  const [createPost, setCreatePost] = useState(false)
  const createPostHandler = () => {
    console.log("Create post is clicked")
    setCreatePost(!createPost)
  }

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const result = await fetch("http://localhost:3300/posts")
  //     const response = await result.json()
  //     if (response.success) {
  //       setPosts(response.result)
  //     }
  //     console.log("result Json: ", response)
  //   }
  //   getPosts()
  // }, [])

  const [posts] = useGetPosts()
  console.log("Posts: from useGetPosts: ", posts)
  const postQuestion = async (enteredValues: enteredValuesType) => {
    const result = await fetch(
      `http://localhost:3300/${user?.email}/createpost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enteredValues),
      }
    )

    const response = await result.json()
    return response
  }

  const formSubmitHandler = async (enteredValues: enteredValuesType) => {
    console.log("FORM SUBMIT HANDLER FROM HOMEEEE", enteredValues)
    //check if the same questions is created by the poster
    // if not, create the post
    const response = await postQuestion(enteredValues)
    if (response.success) {
      console.log("CLOSE THE POST FORM")
      setCreatePost(!createPost)
    } else {
      console.log("SHOW ERROR")
    }
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
                <PostForm onFormSubmit={formSubmitHandler} />
              </div>
            )}
          </div>
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  )
}
