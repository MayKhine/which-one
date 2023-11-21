import { useParams } from "react-router-dom"
import { UserDiv } from "../UI/UserDiv"
import { useEffect, useState } from "react"
import { MenuBar } from "../UI/MenuBar"
import { Post } from "../components/Post/Post"

export const UserPage = () => {
  const { userEmail } = useParams<{ userEmail: string }>()
  const [user, setUser] = useState({})

  const getUserInfoAndPosts = async () => {
    const result = await fetch(`http://localhost:3300/users/${userEmail}`)
    const response = await result.json()

    console.log("USER PAGE RESPONSE : ", response)
    if (response.success) {
      // return response.result
      setUser(response.result)
    }
  }

  useEffect(() => {
    getUserInfoAndPosts()
  }, [])

  // const userEmail = user[0].email
  const userName = user[0]?.name
  const userPic = user[0]?.picture
  const userPosts = user[0]?.postsArr

  console.log("Email: ", userEmail, "posts: ", userPosts)
  return (
    <div style={{ height: "100vh", backgroundColor: "gray" }}>
      <MenuBar />
      This is individual user page
      <div
        style={{
          height: "calc(100% - 70px)",
          backgroundColor: "lightgray",
          display: "flex",
        }}
      >
        <UserDiv
          width="250px"
          name={userName}
          email={userEmail}
          pic={userPic}
        />
        <div style={{ width: "100vw", backgroundColor: "darkgreen" }}>
          {userPosts?.map((post, index) => {
            return (
              <Post
                key={index}
                postCreater={userEmail}
                postCreaterPic={userPic}
                question={post.question}
                answerType={post.answerType}
                answers={post.answers}
                voting={post.voting}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
