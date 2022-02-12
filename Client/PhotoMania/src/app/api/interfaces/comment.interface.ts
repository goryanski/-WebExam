import {CommentReplyInterface} from "./comment-reply.interface";

export interface CommentInterface {
  id: number,
  text: string,
  date: string,
  likesCount: number,
  postId: number,
  ownerId: number,
  ownerName: string,
  repliesCount: number
  replies: CommentReplyInterface[]
}
