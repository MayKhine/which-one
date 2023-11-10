import { useEffect, useState } from "react"
import { PostProps } from "../components/Post/Post"
import { MenuBar } from "../UI/MenuBar"
import { useParams } from "react-router-dom"
import { NoUser } from "../components/Users/NoUser"
import { PostByUser } from "../components/Post/PostByUser"

export const UserPage = () => {
  const [userExists, setUserExists] = useState<boolean>()
  const [postsExists, setPostsExists] = useState<boolean>(false)
  const [posts, setPosts] = useState()
  const { userName } = useParams<{ userName: string }>()
  // const [setPostsExist, setPostsExist] = useState<boolean>()

  useEffect(() => {
    const checkUserExist = async () => {
      const result = await fetch(`http://localhost:3300/users/${userName}`, {
        method: "Get",
      })

      const response = await result.json()
      setUserExists(response.success)
    }

    const getPostsByUser = async () => {
      const result = await fetch(
        `http://localhost:3300/users/${userName}/posts`,
        {
          method: "Get",
        }
      )
      const response = await result.json()
      console.log(response)
      if (response.success) {
        setPostsExists(true)
        setPosts(response.result)
      } else {
        setPostsExists(false)
      }
    }

    checkUserExist()
    if (userExists) {
      getPostsByUser()
    }
  }, [userName, userExists])

  console.log("What is userName: ", userName, userExists, postsExists)

  return (
    <div>
      <MenuBar />
      User Page User is {userName}
      {userExists &&
        postsExists &&
        posts.map((post: PostProps, index: number) => {
          return (
            <PostByUser post={post} key={index} />
            // <div style={{ backgroundColor: "orange" }} key={index}>
            //   {post.userName}
            //   {post.question}
            // </div>
          )
        })}
      {userExists && !postsExists && <div> No posts by this user</div>}
      {!userExists && <NoUser userName={userName} />}
    </div>
  )
}
