import * as stylex from "@stylexjs/stylex"
import { ColorsKey, colors, colorsObj } from "../../styleX/tokens.stylex"

type BarChartProps = {
  voting: Array<Array<string>>
  userVote: number //the index that userVoted
  answers: Array<string>
}
export const BarChart = ({ voting, userVote, answers }: BarChartProps) => {
  const colorArr = Object.keys(colorsObj) as Array<ColorsKey>

  console.log("IN THE BARCHART: ", voting, userVote, answers)

  let voteTotal = 0
  voting.map((voteOption) => {
    voteTotal = voteTotal + voteOption.length
  })

  return (
    <div {...stylex.props(barChartStyles.base)}>
      Current Result:
      <div {...stylex.props(barChartStyles.chart)}>
        {voting.map((barData, index) => {
          const votePct = (barData.length / voteTotal) * 100

          return (
            <div {...stylex.props(barChartStyles.barChart)}>
              <div {...stylex.props(barChartStyles.answerText)}>
                {answers[index]}
              </div>
              <div {...stylex.props(barChartStyles.bar)}>
                <div
                  {...stylex.props(
                    barChartStyles.dynamicBar(votePct),
                    barChartStyles.dynamicBgColor(colorArr[(index + 1) % 7])
                  )}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const barChartStyles = stylex.create({
  base: {
    position: "relative",
    // backgroundColor: "lightgray",
    width: "100%",
  },

  chart: {
    backgroundColor: "white",
    // position: "relative",
    border: "2px solid black",
    borderRadius: "1rem",
    padding: "1rem",
    marginTop: ".5rem",
    // width: "95%",
    minWidth: "700px",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
  },

  option: { display: "flex", flexGrow: "1" },
  label: {
    width: "7rem",
    backgroundColor: "lightgray",
  },

  bar: {
    // backgroundColor: "lightyellow",
    display: "flex",
    width: "100%",
    position: "relative",
  },

  dynamicBar: (votePct) => ({
    width: `${votePct}%`,
    border: "3px solid black",
    borderRadius: "0.5rem",
    height: "2rem",
    margin: "0.2rem",
    display: "flex",
  }),

  dynamicBgColor: (color: ColorsKey) => ({
    backgroundColor: colors[color],
  }),

  answerText: {
    width: "95%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
    display: "block",
    // wordBreak: "break-all",
    // background: "pink",
    fontSize: "1.5rem",
  },
  barChart: {
    // backgroundColor: "red",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
  },
})
