import { MenuBar } from "../UI/MenuBar"
import { useAuth0 } from "@auth0/auth0-react"
import { UserDiv } from "../UI/UserDiv"
import { Posts } from "../components/Post/Posts"
export const Home = () => {
  const { user } = useAuth0()

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
          <Posts />
        </div>
      </div>
    </div>
  )
}
