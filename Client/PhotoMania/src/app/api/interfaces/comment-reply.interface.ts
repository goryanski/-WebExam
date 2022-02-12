export interface CommentReplyInterface {
  id: number,
  text: string,
  date: string,
  likesCount: number,
  ownerId: number,
  ownerName: string,
  commentId: number
  whomId: number,
  whomName: string
}
