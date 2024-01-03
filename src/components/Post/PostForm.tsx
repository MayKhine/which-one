import { useState } from "react"
import * as stylex from "@stylexjs/stylex"
import axios from "axios"
import { Button } from "../../UI/Button"
import { textStyles } from "../../styleX/textStyles"
import { buttonStyles } from "../../styleX/buttonStyles"
import imgUpload from "../../images/image-upload.svg"
import deleteImg from "../../images/delete.svg"
import { ImageUpload } from "../../UI/ImageUpload"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postQuestion } from "../api/posts"
import { Error } from "../../UI/Error"
type PostFormProps = {
  onFormSubmit: (val: enteredValuesType) => boolean
}

export type enteredValuesType = {
  postCreater: string
  question: string
  answers: Array<string>
  images: Array<string>
}

const postFormStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "pink",
    width: "60vw",
    margin: "1.5rem",
    marginLeft: "3rem",
  },

  buttonsDiv: {
    // marginRight: "-.8rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: "1rem",
  },

  inputDiv: {
    display: "flex",
    width: "100%",
    flexGrow: "1",
    height: "3rem",
    marginBottom: ".5rem",
  },
  imageInput: {
    width: "0",
  },
  imageUploadLabel: {
    // background: "red",
    // width: "3rem",
    cursor: "pointer",
  },
  imageLogo: {
    // background: "pink",
    width: "3rem",
  },
  imageUploadDiv: {
    display: "flex",
  },
  deleteIcon1: {
    width: "1.5rem",
    // alignSelf: "flex-start",
    // margin: ".3rem",
    // color: "red",
    marginLeft: "1rem",
    cursor: "pointer",
    marginRight: "-2.5rem",
  },
  deleteIcon2: {
    width: "1.5rem",
    alignSelf: "flex-start",
    margin: ".3rem",
    color: "red",
    cursor: "pointer",
  },
  actionBase: {
    display: "flex",
    // background: "pink",
    // gap: "1rem",
    // marginRight: "-10rem",
  },
})

type imgProps = {
  fileName: string
  img: string
}
export const PostForm = () => {
  const { user } = useAuth0()

  const [error, setError] = useState("")

  const [enteredValues, setEnteredValues] = useState({
    postCreater: user?.email,
    question: "",
    answers: ["", ""],
    images: [],
  })
  const [imgArr, setImgArr] = useState<Array<imgProps>>([])

  const [answerArr, setAnswerArr] = useState(["", ""])
  const [createPost, setCreatePost] = useState(false)
  // let curIndex = 0
  const [curIndexForImgUpload, setCurIndexForImgUpload] = useState(0)

  const cancelPostHandler = () => {
    setCreatePost(!createPost)
    setEnteredValues({
      postCreater: user?.email,
      question: "",
      answers: ["", ""],
      images: [],
    })
    setAnswerArr(["", ""])
    setImgArr([])
    setError("")
  }

  const imageUploadHandler = async (
    event: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = event.target as HTMLInputElement & { files: FileList }
    const image = target.files[0]

    const formData = new FormData()
    formData.append("image", image)
    console.log("WHAT IS FORM DAT: ", formData)

    const result = await axios.post("http://localhost:3300/image", formData)
    console.log(
      "RETURN Result: ",
      result.data.success,
      result.data.image,
      index
    )

    if (result.data.success) {
      inputChangeHandler("images", result.data.image, index)

      const curImgArr = [...imgArr]
      curImgArr[index] = {
        fileName: image.name,
        img: `http://localhost:3300/${result.data.image}`,
      }

      setImgArr([...curImgArr])
      event.target.value = ""
    }
  }

  const removeImage = (indexToRemove: number) => {
    const updatedImgArr = imgArr.filter((_, index) => index !== indexToRemove)
    setImgArr([...updatedImgArr])

    const updatedEnteredAnsArr = enteredValues.images.filter(
      (_, index) => index !== indexToRemove
    )
    setEnteredValues((preVal) => ({
      ...preVal,
      images: [...updatedEnteredAnsArr],
    }))
  }

  const removeAnswerDiv = (indexToRemove: number) => {
    console.log("INDEX TO REMOVE: ", indexToRemove)

    const updatedEnteredAnsArr = enteredValues.answers.filter(
      (_, index) => index !== indexToRemove
    )
    setEnteredValues((preVal) => ({
      ...preVal,
      answers: [...updatedEnteredAnsArr],
    }))

    removeImage(indexToRemove)

    const updatedAnsArr = answerArr.filter(
      (_, index) => index !== indexToRemove
    )
    setAnswerArr([...updatedAnsArr])
  }

  const inputChangeHandler = (
    identifier: string,
    value: string,
    ansIndex: number
  ) => {
    setError("")

    if (identifier == "answers") {
      const curAnsArr = enteredValues.answers

      const curAnsArrUpdated = [...curAnsArr]
      curAnsArrUpdated[ansIndex] = value

      setEnteredValues((preVal) => ({
        ...preVal,
        answers: [...curAnsArrUpdated],
      }))
    } else if (identifier == "images") {
      const curImgArr = enteredValues.images

      const curImgArrUpdated = [...curImgArr]
      curImgArrUpdated[ansIndex] = value

      setEnteredValues((preVal) => ({
        ...preVal,
        images: [...curImgArrUpdated],
      }))
    }
    // for  not answers
    else {
      setEnteredValues((preVal) => ({
        ...preVal,
        [identifier]: value,
      }))
    }
  }

  const checkAnswerArry = () => {
    const ansArryLength = enteredValues.answers.length
    if (ansArryLength < 2) {
      return false
    }

    for (let i = 0; i < ansArryLength; i++) {
      for (let y = 1; y < ansArryLength; y++) {
        const ansA = enteredValues.answers[i].toLowerCase()
        const ansB = enteredValues.answers[y].toLowerCase()

        if (i == y) {
          break
        }
        if (ansA == ansB) {
          return false
        }
      }
    }
    return true
  }

  const queryClient = useQueryClient()

  const newPostMutation = useMutation({
    mutationFn: postQuestion,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["posts"])
      // console.log("Response: ", response)
      // setClearForm(response.success)
    },
  })

  const formSubmitHandler = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    event.preventDefault()

    if (checkAnswerArry()) {
      // const postSuccess = await onFormSubmit(enteredValues)

      // newPostMutation.mutate(enteredValues)

      await newPostMutation.mutate(enteredValues, {
        onSuccess: (data) => {
          if (data.success) {
            event?.target.reset()
            cancelPostHandler()
            setError("")
          } else {
            setError("Post error: this question has been asked by you before.")
            console.log("Post already exists or Show POST ERROR")
          }
        },
      })

      // console.log("WAS SUBMIT SUCCESS: ", postSuccess)
      // if (clearForm) {
      //   console.log("CLEAR THE FORM ")
      //   // event?.target.reset()
      //   cancelPostHandler()
      // } else {
      //   console.log("SHOW POST ERROR")
      // }
    } else {
      setError("Post error: duplicate answers.")
      console.log("SHOW POST ERROR: Not right ans checkAnswerArry")
    }
  }

  return (
    <form onSubmit={formSubmitHandler} {...stylex.props(postFormStyles.base)}>
      <div>
        <div>What's your question?</div>
        <div {...stylex.props(postFormStyles.inputDiv)}>
          <input
            {...stylex.props(textStyles.input, textStyles.inputQuesion)}
            required
            type="text"
            value={enteredValues.question}
            onSelect={() => {
              if (!createPost) {
                setCreatePost(!createPost)
              }
            }}
            onChange={(event) => {
              inputChangeHandler("question", event?.target.value, 121)
            }}
          ></input>
        </div>
      </div>

      {createPost && (
        <div>
          <div>
            {answerArr.map((answer, index) => {
              const label = "Option " + (index + 1).toString()
              return (
                <div key={index}>
                  <div>{label}</div>
                  <div {...stylex.props(postFormStyles.inputDiv)}>
                    <input
                      required
                      {...stylex.props(
                        textStyles.input,
                        textStyles.inputQuesion
                      )}
                      type="text"
                      onChange={(event) => {
                        inputChangeHandler("answers", event.target.value, index)
                      }}
                    ></input>

                    <div
                      key={index}
                      {...stylex.props(postFormStyles.actionBase)}
                    >
                      <label
                        {...stylex.props(postFormStyles.imageUploadLabel)}
                        htmlFor="inputFile"
                        onClick={() => {
                          setCurIndexForImgUpload(index)
                        }}
                      >
                        <img
                          {...stylex.props(postFormStyles.imageLogo)}
                          src={imgUpload}
                          alt="my img"
                        ></img>
                      </label>
                      {/* {index > 1 && index == answerArr.length - 1 && ( */}
                      {index > 1 && (
                        <img
                          {...stylex.props(postFormStyles.deleteIcon1)}
                          src={deleteImg}
                          alt="my img"
                          onClick={() => {
                            console.log(
                              "work on removing the answer div",
                              index
                            )
                            removeAnswerDiv(index)
                          }}
                        ></img>
                      )}
                      <input
                        {...stylex.props(postFormStyles.imageInput)}
                        id="inputFile"
                        type="file"
                        name="image"
                        accept="image/png, image/jpeg, image.gif, image/webp, image/svg"
                        // value={inputVal}
                        onInput={(event) => {
                          console.log("index in input: ", index)
                          imageUploadHandler(event, curIndexForImgUpload)
                        }}
                      ></input>
                    </div>
                  </div>
                  {imgArr[index] && imgArr[index].img && (
                    <div {...stylex.props(postFormStyles.imageUploadDiv)}>
                      <ImageUpload
                        index={index}
                        image={imgArr[index].img}
                        fileName={imgArr[index].fileName}
                      />
                      <img
                        {...stylex.props(postFormStyles.deleteIcon2)}
                        src={deleteImg}
                        alt="my img"
                        onClick={() => {
                          removeImage(index)
                        }}
                      ></img>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div {...stylex.props(postFormStyles.buttonsDiv)}>
            {answerArr.length <= 9 && (
              <div>
                <button
                  {...stylex.props(buttonStyles.base, buttonStyles.addAnswer)}
                  onClick={() => {
                    setAnswerArr((prevVal) => [...prevVal, ""])
                  }}
                >
                  +
                </button>
              </div>
            )}

            <div>
              <Button text="Cancel" onClickFn={cancelPostHandler} />
              <Button
                text="Create"
                onClickFn={() => {
                  console.log("Submit Button is clciked")
                }}
              />
            </div>
            {error && error.length > 1 && <Error error={error}></Error>}
          </div>
        </div>
      )}
    </form>
  )
}
