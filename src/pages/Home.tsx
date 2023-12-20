import { MenuBar } from "../UI/MenuBar"
import { Posts } from "../components/Post/Posts"
import { PostForm } from "../components/Post/PostForm"
import { textStyles } from "../styleX/textStyles"
import * as stylex from "@stylexjs/stylex"
import { getPosts } from "../components/api/posts"
import { useQuery } from "@tanstack/react-query"

export const Home = () => {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  // const queryClient = useQueryClient()

  // const newPostMutation = useMutation({
  //   mutationFn: postQuestion,
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries(["posts"])
  //   },
  // })

  return (
    <div {...stylex.props(textStyles.base)}>
      <MenuBar />

      <div>
        <PostForm />
        {isLoading && <div> Loading </div>}
        {isError && <div> Error: no post data from server </div>}
        {isSuccess && <Posts posts={data} />}
      </div>
    </div>
  )
}
