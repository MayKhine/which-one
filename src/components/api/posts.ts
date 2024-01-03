import { enteredValuesType } from "../Post/PostForm"

export const getPosts = async () => {
  const result = await fetch("http://localhost:3300/posts")
  const response = await result.json()
  if (response.success) {
    return response.result
  }
}

export const getPostsByUser = async (email: string) => {
  const result = await fetch(
    `http://localhost:3300/postsbyemail?email=${email}`
  )
  const response = await result.json()
  console.log("What is response from getPostsByUser", response)
  return response
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
type votingDataType = {
  postID: string
  ansIndex: number
  voterEmail: string
}

export const voteOnPost = async (votingData: votingDataType) => {
  const result = await fetch(`http://localhost:3300/vote`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(votingData),
  })
  const response = await result.json()
  console.log("Post RESPONSE: ", response)
  return response
}

export const deleteOnPost = async (postID) => {
  const result = await fetch(`http://localhost:3300/delete/${postID}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })

  const response = await result.json()
  console.log("Post Delete Response: ", response)
  return response
}
