import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../components/api/users"
import { UserCard, UserCardProps } from "../components/Users/UserCard"
import { MenuBar } from "../UI/MenuBar"
import * as stylex from "@stylexjs/stylex"

export const UsersPage = () => {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  return (
    <div>
      <MenuBar />
      {isLoading && <div> Loading </div>}
      {isError && <div> Error: no post data from server </div>}
      {isSuccess && (
        <div {...stylex.props(usersPageStyles.base)}>
          {data.map((user: UserCardProps, index: number) => {
            return (
              <UserCard
                key={user._id}
                _id={user._id}
                name={user.name}
                email={user.email}
                picture={user.picture}
                index={index}
              ></UserCard>
            )
          })}
        </div>
      )}
    </div>
  )
}

const usersPageStyles = stylex.create({
  base: {
    display: "flex",
    gap: "2rem",
    margin: "3rem",
    flexWrap: "wrap",
  },
})
