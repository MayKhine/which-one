import { useParams } from "react-router-dom"
import { MenuBar } from "../UI/MenuBar"
import { useQuery } from "@tanstack/react-query"
import { getUserInfoAndPosts } from "../components/api/users"
import { UserDiv } from "../UI/UserDiv"
import * as stylex from "@stylexjs/stylex"

export const UserPage = () => {
  const { userEmail } = useParams<{ userEmail: string }>()
  console.log("usePrams", userEmail)

  const userInfoQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfoAndPosts(userEmail),
  })

  return (
    <div>
      <MenuBar />
      <div
        // style={{
        //   height: "calc(100% - 70px)",
        //   backgroundColor: "lightgray",
        //   display: "flex",
        // }}
        {...stylex.props(userPageStyles.base)}
      >
        {userInfoQuery.isLoading && <div> Loading </div>}
        {userInfoQuery.isError && <div> Error: no post data from server </div>}
        {userInfoQuery.isSuccess && (
          // <div>{userInfoQuery.data.result[0].name}</div>
          <UserDiv
            width="250px"
            name={userInfoQuery.data.result[0].name}
            email={userInfoQuery.data.result[0].email}
            pic={userInfoQuery.data.result[0].picture}
          />
        )}

        {/* <div style={{ width: "100vw", backgroundColor: "darkgreen" }}>
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
        </div> */}
      </div>
    </div>
  )
}

const userPageStyles = stylex.create({
  base: {
    backgroundColor: "lightgreen",
    height: "calc(100vh - 108px)",
    // padding: "2rem",
  },
})
