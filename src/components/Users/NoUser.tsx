type NoUserProps = {
  userName: string
}

export const NoUser = ({ userName }: NoUserProps) => {
  return (
    <div style={{ backgroundColor: "red" }}>User {userName} does not exist</div>
  )
}
