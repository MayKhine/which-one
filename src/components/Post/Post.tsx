import { useState } from "react"
import { Navigate } from "react-router-dom"
import * as stylex from "@stylexjs/stylex"
import { colors } from "../../styleX/tokens.stylex"
import { motion } from "framer-motion"
import { useAuth0 } from "@auth0/auth0-react"
import { voteOnPost } from "../api/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { Chart } from "react-google-charts"

import { ProfilePic } from "../../UI/ProfilePic"
import { ImageCard } from "../../UI/ImageCard"
import img from "../../images/profilePic.png"
import { Answer } from "./Answer"
import { BarChart } from "../Chart/BarChart"

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

  let userVote = 99
  const checkUserVoted = (
    voterData: Array<Array<string>>,
    curVoterEmail: string
  ) => {
    for (let i = 0; i <= voterData.length; i++) {
      for (let j = 0; j <= voterData[i]?.length; j++) {
        if (voterData[i][j] == curVoterEmail) {
          userVote = i
          return true
        }
      }
    }
    return false
  }

  const userVotedOnThisPost = checkUserVoted(voting, user.name)

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
    voteOnPostMutation.mutate(votingData)
  }

  // const barData = [
  //   ["Voting", "Option", "B"],
  //   ["New York", 1, 2],
  //   ["Los Angeles", [1, 1, 1].length, [1.1].length],
  //   ["Chicago", 2, 3],
  // ]

  // const barOptions = {
  //   title: "Title bar",
  //   chartArea: { width: "50%" },
  //   isStacked: true,
  //   hAxis: {
  //     title: "hAxis",
  //     minValue: 0,
  //   },
  //   vAxis: {
  //     title: "vAxis",
  //   },
  // }

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

        {userVotedOnThisPost && (
          <BarChart voting={voting} userVote={userVote} />
        )}

        {!userVotedOnThisPost && (
          <div {...stylex.props(postStyles.answersDiv)}>
            {images.length == 0 && (
              <div>
                {answers.map((ans, index) => {
                  return (
                    <Answer
                      {...stylex.props(postStyles.pointer)}
                      index={index}
                      answer={ans}
                      voteFn={() => {
                        // if (userVotedOnThisPost === false) {
                        voteHandler(index)
                        // }
                      }}
                    />
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
        )}
      </div>
      <div>
        {navigate && <Navigate to={navigate} replace={true}></Navigate>}
      </div>
    </motion.div>
  )
}

const postStyles = stylex.create({
  base: {
    display: "flex",
    borderRadius: "0.5rem",
    backgroundColor: colors.offwhite,
    border: "3px solid black",
    // boxShadow: {
    //   default: "0px",
    //   ":hover": "8px 8px 0px rgba(0, 0, 0, 1)",
    // },
    padding: "1rem",
    marginBottom: "2rem",
  },

  imagesDiv: {
    display: "flex",
    flexDirection: "row",
    gap: "4rem",
    backgroundColor: colors.red,
    flexWrap: "wrap",
    width: "100%",
  },

  postCreaterDiv: {
    cursor: "pointer",
    // backgroundColor: "gray",
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
    width: "100%",
  },
  answersDiv: {},

  pointer: {
    cursor: "pointer",
    backgroundColor: "lightpink",
    marginBottom: "2rem",
  },
})
