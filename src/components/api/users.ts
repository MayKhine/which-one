export const getUsers = async () => {
  const result = await fetch("http://localhost:3300/users")
  const response = await result.json()
  return response
}

export const getUserInfoAndPosts = async (email: string) => {
  // const result = await fetch(
  //   `http://localhost:3300/postsbyemail?email=${email}`
  // )

  const result = await fetch(`http://localhost:3300/users/${email}`)

  const response = await result.json()
  console.log("What is response from getThisUserInfo", response)
  return response
}
