export const CurrentUser = () => {
  const userName = "user1"
  const getUser = async () => {
    const user = await fetch(`http://localhost:3300/users/${userName}`, {
      method: "Get",
    })
    const response = await user.json()
    return response.result
  }
  const user = getUser()
  console.log("user: ", user)
  return { getUser }
}

export const getCurrentUser = () => {}
