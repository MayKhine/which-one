import { MenuBar } from "../UI/MenuBar"
import { useAuth0 } from "@auth0/auth0-react"
import { Posts } from "../components/Post/Posts"
import { PostForm, enteredValuesType } from "../components/Post/PostForm"
import { useGetPosts } from "../hooks/useGetPosts"
import { textStyles } from "../styleX/textStyles"
import * as stylex from "@stylexjs/stylex"

export const Home = () => {
  const { user } = useAuth0()

  const [posts, refetch] = useGetPosts()

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
      refetch()
      console.log("CLOSE THE POST FORM")
      // setCreatePost(!createPost)
      return true
    } else {
      console.log("SHOW ERROR")
      return false
    }
  }

  return (
    <div {...stylex.props(textStyles.base)}>
      <MenuBar />

      <div>
        {/* <div
          style={{
            // backgroundColor: "yellow",
            marginTop: ".5rem",
            padding: "1rem",
          }}
        >
          {!createPost && (
            <div>
              <div style={{ fontWeight: "600", fontSize: "2rem" }}>
                What's your question?
              </div>

              <input
                style={createPostBarStyle}
                type="text"
                placeholder="What should .."
                onSelect={createPostHandler}
              ></input>
            </div>
          )}
          {createPost && (
            <div>
              <PostForm
                onFormSubmit={formSubmitHandler}
                onCancel={cancelPostHandler}
              />
            </div>
          )}
        </div> */}
        <PostForm
          onFormSubmit={formSubmitHandler}
          // onCancel={cancelPostHandler}
        />
        <Posts posts={posts} />
      </div>
    </div>
  )
}
