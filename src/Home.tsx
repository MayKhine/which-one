import { MenuBar } from "./UI/MenuBar"
import { useAuth0 } from "@auth0/auth0-react"
import { UserDiv } from "./UI/UserDiv"
import { AllPostsExceptLoginUser } from "./components/Post/AllPostsExceptLoginUser"
export const Home = () => {
  const { isAuthenticated, user } = useAuth0()
  console.log("Is ", isAuthenticated, user)
  console.log("HOMMEE")

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
          <AllPostsExceptLoginUser loginUserEmail={user?.email} />
        </div>
      </div>
    </div>
  )
}
