import { useParams } from "react-router-dom"
import { UserDiv } from "../UI/UserDiv"
import { useEffect, useState } from "react"
import { MenuBar } from "../UI/MenuBar"
import { Post, PostProps } from "../components/Post/Post"
import { useGetPosts } from "../hooks/useGetPosts"

export const UserPage = () => {
  const { userEmail } = useParams<{ userEmail: string }>()
  // const [user, setUser] = useState({})
  const [posts, refetch] = useGetPosts()
  // const getUserInfoAndPosts = async () => {
  //   const result = await fetch(`http://localhost:3300/users/${userEmail}`)
  //   const response = await result.json()

  //   console.log("USER PAGE RESPONSE : ", response)
  //   if (response.success) {
  //     // return response.result
  //     setUser(response.result)
  //   }
  // }

  // useEffect(() => {
  //   getUserInfoAndPosts()
  // }, [])

  // const userEmail = posts[0].postCreater
  const userName = posts[0]?.postCreaterInfo[0].name
  const userPic = posts[0]?.postCreaterInfo[0].picture
  // const userPosts = user[0]?.postsArr
  console.log("What is posts: ", posts)

  const userPosts = posts.filter((post) => {
    if (post.postCreater == userEmail) {
      return true
    }
    return false
  })

  console.log("User posts: ", userPosts)

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
          {userPosts?.map((post: PostProps, index: number) => {
            console.log("WHat is in a post: ", post)

            return (
              <Post
                key={index}
                postCreater={post.postCreater}
                postCreaterInfo={post.postCreaterInfo}
                question={post.question}
                answers={post.answers}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
