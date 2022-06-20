import { CommentsProps } from "./Comment"

export interface PostProps {
    title: string,
    content: string,
    id: number,
    user_id: number
    comments: CommentsProps[],
  }