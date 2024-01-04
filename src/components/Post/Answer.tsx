import * as stylex from "@stylexjs/stylex"
import { motion } from "framer-motion"
import { ColorsKey, colors, colorsObj } from "../../styleX/tokens.stylex"

type AnswerProps = {
  answer: string
  index: number
  voteFn: (index: number) => void
}

export const Answer = ({ answer, voteFn, index }: AnswerProps) => {
  const colorArr = Object.keys(colorsObj) as Array<ColorsKey>

  return (
    <motion.div
      {...stylex.props(
        answerStyles.base,
        answerStyles.dynamicBgColor(colorArr[(index + 1) % 7])
      )}
      transition={{
        duration: 0.2,
        // type: "spring",
        damping: 100,
        stiffness: 100,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.8 }}
      onClick={() => {
        voteFn(index)
      }}
      key={index}
    >
      {answer}
    </motion.div>
  )
}

const answerStyles = stylex.create({
  base: {
    cursor: "pointer",
    marginBottom: "1rem",
    border: "3px solid black",
    borderRadius: ".5em",
    padding: ".4rem",
    width: "95%",
    // width: "max-content",
  },
  dynamicBgColor: (color: ColorsKey) => ({
    // backgroundColor: `colors.${color}`,
    backgroundColor: colors[color],
  }),
})
