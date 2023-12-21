import { useState } from "react"
import { Navigate } from "react-router-dom"
import img from "../../images/profilePic.png"
import { ProfilePic } from "../../UI/ProfilePic"
import { ImageCard } from "../../UI/ImageCard"
import * as stylex from "@stylexjs/stylex"
import { colors } from "../../styleX/tokens.stylex"
import { motion } from "framer-motion"
import { useAuth0 } from "@auth0/auth0-react"
import { voteOnPost } from "../api/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type postCreaterInfoType = {
  _id: string
  name: string
  email: string
  picture: string
}

export type PostProps = {
  id: string
  postCreater: string
  postCreaterInfo: Array<postCreaterInfoType>
  question: string
  answers: Array<string>
  images: Array<string>
  index: number
  voting: Array<Array<string>>
}

export const Post = ({
  question,
  postCreater,
  answers,
  images,
  postCreaterInfo,
  index,
  id,
  voting,
}: PostProps) => {
  const { user } = useAuth0()

  const [navigate, setNavigate] = useState("")
  const postCreaterPic = postCreaterInfo[0].picture || img
  const postCreaterName = postCreaterInfo[0].name || postCreater

  // console.log("voting: question: ", question, voting)

  const checkUserVoted = (
    voterData: Array<Array<string>>,
    curVoterEmail: string
  ) => {
    for (let i = 0; i <= voterData.length; i++) {
      for (let j = 0; j <= voterData[i]?.length; j++) {
        if (voterData[i][j] == curVoterEmail) {
          return true
          // setUserVoted(true)
        }
      }
    }
    return false
    // setUserVoted(false)
  }

  const userVotedOnThisPost = checkUserVoted(voting, user.name)

  // console.log("is User voted: ", userVotedOnThisPost)
  const queryClient = useQueryClient()

  const voteOnPostMutation = useMutation({
    mutationFn: voteOnPost,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["posts"])
      console.log("WHAT IS RESPONE AFTER VOTE", response)
    },
  })

  const voteHandler = (index: number) => {
    const votingData = {
      postID: id,
      ansIndex: index,
      voterEmail: user?.name,
    }

    //send vote data to db
    // const sendVoteToServer = async () => {
    //   const result = await fetch(`http://localhost:3300/vote`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(votingData),
    //   })
    //   const response = await result.json()
    //   console.log("Post RESPONSE: ", response)
    // }

    // sendVoteToServer()
    voteOnPostMutation.mutate(votingData)
  }

  return (
    <motion.div
      {...stylex.props(postStyles.base)}
      transition={{
        duration: 0.05,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      whileHover={{
        x: "-3px",
        y: "-3px",
        boxShadow: "3px 3px 0 rgba(0, 0, 0, 1)",
      }}
      key={index}
    >
      <div {...stylex.props(postStyles.postCreaterDiv)}>
        <ProfilePic image={postCreaterPic} size="4rem" />
        <div
          onClick={() => {
            const urlStr = `/users/${postCreater}`
            setNavigate(urlStr)
          }}
        >
          {postCreaterName}
        </div>
      </div>

      <div>
        <div {...stylex.props(postStyles.questionDiv)}>{question}</div>
        <div {...stylex.props(postStyles.answersDiv)}>
          {userVotedOnThisPost && <p> you have voted</p>}

          {images.length == 0 && (
            <div>
              {answers.map((ans, index) => {
                return (
                  <li
                    {...stylex.props(postStyles.pointer)}
                    key={index}
                    onClick={() => {
                      // if (userVotedOnThisPost === false) {
                      voteHandler(index)
                      // }
                    }}
                  >
                    {ans}
                  </li>
                )
              })}
            </div>
          )}

          {images.length != 0 && (
            <div {...stylex.props(postStyles.imagesDiv)}>
              {images.map((img, index) => {
                const imgSrc = `http://localhost:3300/${img}`
                return (
                  <div
                    {...stylex.props(postStyles.pointer)}
                    key={index}
                    onClick={() => {
                      voteHandler(index)
                    }}
                  >
                    <ImageCard
                      imgSrc={imgSrc}
                      key={index}
                      index={index}
                      text={answers[index]}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div>
          {navigate && <Navigate to={navigate} replace={true}></Navigate>}
        </div>
      </div>
    </motion.div>
  )
}

const postStyles = stylex.create({
  base: {
    display: "flex",
    borderRadius: "0.5rem",
    backgroundColor: colors.yellow,
    margin: "3rem",
    border: "3px solid black",
    // boxShadow: {
    //   default: "0px",
    //   ":hover": "8px 8px 0px rgba(0, 0, 0, 1)",
    // },
    padding: "1rem",
  },

  imagesDiv: {
    display: "flex",
    flexDirection: "row",
    gap: "4rem",
    backgroundColor: colors.red,
  },

  postCreaterDiv: {
    cursor: "pointer",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "1rem",
    width: "8rem",
    height: "max-content",
  },

  questionDiv: {
    fontSize: "2rem",
    marginBottom: ".8rem",
    // backgroundColor: "lightyellow",
    // border: "2px solid black",
  },
  answersDiv: {
    // backgroundColor: "lightpink",
  },

  pointer: {
    cursor: "pointer",
    backgroundColor: "lightpink",
    marginBottom: "2rem",
  },
})
