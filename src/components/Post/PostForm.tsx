import { useState } from "react"
import * as stylex from "@stylexjs/stylex"
import axios from "axios"
import { Button } from "../../UI/Button"
import { textStyles } from "../../styleX/textStyles"
import { buttonStyles } from "../../styleX/buttonStyles"
import imgUpload from "../../images/image-upload.svg"
type PostFormProps = {
  onFormSubmit: (val: enteredValuesType) => void
}

export type enteredValuesType = {
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
})

type imgProps = {
  fileName: string
  img: string
}
export const PostForm = ({ onFormSubmit }: PostFormProps) => {
  const [enteredValues, setEnteredValues] = useState({
    question: "",
    answers: ["", ""],
    images: [""],
  })
  const [imgArr, setImgArr] = useState<Array<imgProps>>([])

  const [answerArr, setAnswerArr] = useState(["", ""])
  const [createPost, setCreatePost] = useState(false)
  // let curIndex = 0
  const [curIndexForImgUpload, setCurIndexForImgUpload] = useState(0)

  const cancelPostHandler = () => {
    setCreatePost(!createPost)
    setEnteredValues({
      question: "",
      answers: ["", ""],
      images: [],
    })
    setAnswerArr(["", ""])
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
    }
  }

  const inputChangeHandler = (
    identifier: string,
    value: string,
    ansIndex: number
  ) => {
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
        const ansA = enteredValues.answers[i]
        const ansB = enteredValues.answers[y]

        if (i == y) {
          break
        }
        if (ansA.toLowerCase() == ansB.toLowerCase()) {
          return false
        }
      }
    }
    return true
  }

  const formSubmitHandler = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    event.preventDefault()

    if (checkAnswerArry()) {
      // console.log("IN THE FORM SUBMIT HANDLER SUCCESS", enteredValues)

      const postSuccess = await onFormSubmit(enteredValues)

      console.log("WAS SUBMIT SUCCESS: ", postSuccess)
      if (postSuccess) {
        console.log("CLEAR THE FORM ")
        event?.target.reset()
        cancelPostHandler()
      } else {
        console.log("SHOW POST ERROR")
      }
    } else {
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

                    <div key={index}>
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

                      <input
                        {...stylex.props(postFormStyles.imageInput)}
                        id="inputFile"
                        type="file"
                        name="image"
                        accept="image/png, image/jpeg,image.gif, image/webp,image/svg"
                        onClick={(event) => {
                          console.log("index in input: ", index)

                          imageUploadHandler(event, curIndexForImgUpload)
                        }}
                      ></input>
                    </div>
                  </div>
                  {imgArr[index] && imgArr[index].img && (
                    <div>
                      <img
                        style={{ width: "7rem" }}
                        key={index}
                        src={imgArr[index].img}
                        alt={`image + ${index}`}
                      ></img>
                      <p>{imgArr[index].fileName}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div {...stylex.props(postFormStyles.buttonsDiv)}>
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
            <div>
              <Button text="Cancel" onClickFn={cancelPostHandler} />
              <Button
                text="Create"
                onClickFn={() => {
                  console.log("Submit Button is clciked")
                  // formSubmitHandler()
                }}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
