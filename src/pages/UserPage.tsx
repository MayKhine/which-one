import { useEffect, useState } from "react"
import { PostProps } from "../components/Post/Post"
import { MenuBar } from "../UI/MenuBar"
import { useParams } from "react-router-dom"
import { NoUser } from "../components/Users/NoUser"
import { PostByUser } from "../components/Post/PostByUser"
import { useUserApi } from "../hooks/useUserApi"

export const UserPage = () => {
  const [userExists, setUserExists] = useState<boolean>()
  const [postsExists, setPostsExists] = useState<boolean>(false)
  const [posts, setPosts] = useState()
  const { userName } = useParams<{ userName: string }>()
  // const [setPostsExist, setPostsExist] = useState<boolean>()

  //
  const checkUserExist = async () => {
    const result = await fetch(`http://localhost:3300/users/${userName}`, {
      method: "Get",
    })

    const response = await result.json()
    // setUserExists(response.success)
    return response.success
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

  const { user } = useUserApi("user1")
  const curUser = user?.name
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
    if (curUser == post.userName) {
      console.log("Delete Post Handler")
      deletePost()
    } else {
      console.log("Cancel Delete Post Handler")
    }
  }

  useEffect(() => {
    // checkUserExist()
    // if (userExists) {
    // }

    const checkUser = async () => {
      const result = await checkUserExist()
      setUserExists(result)
    }

    const getPosts = async () => {
      await getPostsByUser()
    }

    checkUser()
    console.log("UserExists", userExists)

    if (userExists) {
      getPosts()
    }
  }, [])

  console.log("What is userName: ", userName, userExists, postsExists)

  return (
    <div>
      <MenuBar />
      User Page User is {userName}
      {userExists &&
        postsExists &&
        posts.map((post: PostProps, index: number) => {
          return (
            <PostByUser
              post={post}
              key={index}
              onDeleteFn={deletePostHandler}
            />
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
