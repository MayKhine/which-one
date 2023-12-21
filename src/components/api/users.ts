export const getUsers = async () => {
  const result = await fetch("http://localhost:3300/users")
  const response = await result.json()
  return response
}
