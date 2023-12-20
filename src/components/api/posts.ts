import { enteredValuesType } from "../Post/PostForm"

export const getPosts = async () => {
  const result = await fetch("http://localhost:3300/posts")
  const response = await result.json()
  if (response.success) {
    return response.result
  }
}

export const postQuestion = async (enteredValues: enteredValuesType) => {
  // const result = await fetch(`http://localhost:3300/${email}/createpost`, {
  const result = await fetch(`http://localhost:3300/createpost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredValues),
  })

  const response = await result.json()
  return response
}
