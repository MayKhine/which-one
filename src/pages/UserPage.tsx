import { useParams } from "react-router-dom"
import { MenuBar } from "../UI/MenuBar"
import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "../components/api/users"
import * as stylex from "@stylexjs/stylex"
import { UserCard } from "../components/Users/UserCard"
import { Posts } from "../components/Post/Posts"
import { getPostsByUser } from "../components/api/posts"
import { useAuth0 } from "@auth0/auth0-react"

export const UserPage = () => {
  let { userEmail } = useParams<{ userEmail: string }>()

  console.log("usePrams", userEmail)

  if (userEmail == null) {
    const { user } = useAuth0()

    userEmail = user?.email
  }
  const userInfoQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(userEmail),
  })

  const userPostsQuery = useQuery({
    queryKey: ["userPosts"],
    queryFn: () => getPostsByUser(userEmail),
  })

  console.log("userInfoQuery query: ", userInfoQuery.data)

  return (
    <div>
      <MenuBar />
      <div {...stylex.props(userPageStyles.base)}>
        <div {...stylex.props(userPageStyles.left)}>
          {userInfoQuery.isLoading && <div> Loading </div>}
          {userInfoQuery.isError && (
            <div> Error: no post data from server </div>
          )}
          {userInfoQuery.isSuccess && (
            <UserCard
              index={0}
              _id={userInfoQuery.data.result._id}
              name={userInfoQuery.data.result.name}
              email={userInfoQuery.data.result.email}
              picture={userInfoQuery.data.result.picture}
              detail={true}
            ></UserCard>
          )}
        </div>

        <div {...stylex.props(userPageStyles.right)}>
          {userPostsQuery.isSuccess && userPostsQuery.data.success == false && (
            <div>NO POSTS </div>
          )}
          {userPostsQuery.isSuccess && userPostsQuery.data.success && (
            <Posts posts={userPostsQuery.data.result} />
          )}
        </div>
      </div>
    </div>
  )
}

const userPageStyles = stylex.create({
  base: {
    display: "flex",
    // backgroundColor: "lightgreen",
    height: "calc(100vh - 108px)",
    // padding: "2rem",
    // width: "0vw",
    gap: "5rem",
  },
  left: { backgroundColor: "gray", width: "500px" },
  right: {
    backgroundColor: "lightblue",
    //  width: "100%"
  },
})
