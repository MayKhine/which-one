import * as stylex from "@stylexjs/stylex"
import { ColorsKey, colors, colorsObj } from "../../styleX/tokens.stylex"

type BarChartProps = {
  voting: Array<Array<string>>
  userVote: number //the index that userVoted
}
export const BarChart = ({ voting, userVote }: BarChartProps) => {
  const colorArr = Object.keys(colorsObj) as Array<ColorsKey>

  console.log("IN THE BARCHAR: ", voting, userVote)

  let voteTotal = 0
  voting.map((voteOption) => {
    voteTotal = voteTotal + voteOption.length
  })

  console.log("vote total: ", voteTotal)

  return (
    <div {...stylex.props(barChartStyles.base)}>
      {userVote}
      {voting.map((barData, index) => {
        const optionLabel = `Option ${index + 1}`
        const votePct = (barData.length / voteTotal) * 100
        console.log("vote pct: ", votePct)
        return (
          <div {...stylex.props(barChartStyles.option)} key={index}>
            <div {...stylex.props(barChartStyles.label)}> {optionLabel}</div>
            <div {...stylex.props(barChartStyles.bar)}>
              <div
                {...stylex.props(
                  barChartStyles.dynamicBar(votePct),
                  barChartStyles.dynamicBgColor(colorArr[(index + 1) % 7])
                )}
              >
                <p {...stylex.props(barChartStyles.overflow)}>
                  TESTTESTTESTTEST
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const barChartStyles = stylex.create({
  base: { backgroundColor: "gray", width: "100%" },
  option: { backgroundColor: "red", display: "flex", flexGrow: "1" },
  label: {
    width: "7rem",
    backgroundColor: "lightgray",
  },
  bar: {
    backgroundColor: "lightyellow",
    display: "flex",
    width: "100%",
  },

  dynamicBar: (votePct) => ({
    // width: votePct,
    // width: "calc(100% - 50%)",
    width: `${votePct}%`,
    border: "3px solid black",
    borderRadius: "0.5rem",
    height: "2rem",
    backgroundColor: "lightgreen",
  }),

  dynamicBgColor: (color: ColorsKey) => ({
    backgroundColor: colors[color],
  }),

  overflow: {
    position: "absolute",
    marginTop: "-.1rem",
    marginLeft: ".5rem",
    // top: "0",
    // left: "0",
    zIndex: "1",
    color: "black",
  },
})
