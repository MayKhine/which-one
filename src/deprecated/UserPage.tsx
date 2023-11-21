import { useEffect, useState } from "react"
import { PostProps } from "../components/Post/Post"
import { MenuBar } from "../UI/MenuBar"
import { useParams } from "react-router-dom"
import { NoUser } from "../components/Users/NoUser"
import { PostByUser } from "../components/Post/PostByUser"
import { UserPageLayout } from "../layout/UserPageLayout"
export const UserPage = () => {
  const [userExists, setUserExists] = useState<boolean>()
  const [postsExists, setPostsExists] = useState<boolean>(false)
  const [posts, setPosts] = useState()
  const [actionToggle, setActionToggle] = useState<boolean>(false)
  const { userName } = useParams<{ userName: string }>()

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

  const deletePost = async (postUserName: string, postID: string) => {
    const result = await fetch(
      `http://localhost:3300/users/${postUserName}/posts/${postID}?delete=true`,
      {
        method: "Delete",
      }
    )
    const response = await result.json()
    setActionToggle(!actionToggle)
    console.log("Delete Response: ", response)
  }

  const deletePostHandler = (
    curUserName: string,
    postUserName: string,
    postID: string
  ) => {
    console.log("Delete Post Handler is called")
    if (curUserName == postUserName) {
      console.log("Delete Post Handler")
      deletePost(postUserName, postID)
      // deletePost()
    } else {
      console.log("Cancel Delete Post Handler")
    }
  }

  const editPost = async (
    postUserName: string,
    postID: string,
    editPostData: any
  ) => {
    //get current post data
    //edit then
    //send put

    const result = await fetch(
      `http://localhost:3300/users/${postUserName}/posts/${postID}?delete=true`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPostData),
      }
    )
    const response = await result.json()
    setActionToggle(!actionToggle)
    console.log("Edit Response: ", response)
  }

  const editPostHandler = (
    curUserName: string,
    postUserName: string,
    postID: string
  ) => {
    console.log("Edit Post Handler is called")
    if (curUserName == postUserName) {
      console.log("Edit Post Handler")
      const editPostData = {
        question: "NEW QUESTIONS",
      }
      editPost(postUserName, postID, editPostData)
    } else {
      console.log("Cancel Edit Post Handler")
    }
  }

  useEffect(() => {
    getPostsByUser()
  }, [actionToggle])

  console.log("What is userName: ", userName, userExists, postsExists)

  return (
    <div style={{ height: "100vh" }}>
      <MenuBar />
      User Page User is {userName}
      <UserPageLayout
        userName={userName}
        children={
          <div>
            {!userExists && <NoUser userName={userName} />}
            {userExists &&
              postsExists &&
              posts.map((post: PostProps, index: number) => {
                return (
                  <PostByUser
                    post={post}
                    key={index}
                    onDelete={deletePostHandler}
                    onEdit={editPostHandler}
                  />
                )
              })}
            {userExists && !postsExists && <div> No posts by this user</div>}
          </div>
        }
      />
    </div>
  )
}
