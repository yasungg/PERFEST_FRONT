// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { formatDate } from "../components/DateStyle";




// const WriteComment = ({
//   commentData,
//   replyCommentData,
//   showReplyInput,
//   replyCommentInput,
//   onClickShowReplyWrite,
//   onClickCommentLike,
//   onClickWriteReplyComment,
//   onChangeReplyComment,
// }) => {
//   return (
//     <>
//       {commentData && commentData.map((comment) => (
//         <CommentDesc key={comment.commentId}>
//           <Comment>
//             <CommentHead>
//               <CommentNickName>{comment.nickname}</CommentNickName>
//               <CommentWrittenTime>{formatDate(comment.commentWrittenTime)}</CommentWrittenTime>
//               <CommentReWrite>
//                 <button className="replycomment" onClick={() => onClickShowReplyWrite(comment.commentId)}>대댓글</button>
//               </CommentReWrite>
//               <CommentLike>
//                 <button className="like" onClick={() => onClickCommentLike(comment.commentId)}>좋아요</button>
//               </CommentLike>
//             </CommentHead>
//             <CommentArr>
//               <CommentBody>{comment.commentBody}</CommentBody>
//               <CommentLikeCount>
//                 <Heart />
//                 {comment.commentLikeCount}
//               </CommentLikeCount>
//             </CommentArr>
//             {/* 대댓글 렌더링 */}
//             {replyCommentData[comment.commentId] &&
//               replyCommentData[comment.commentId].map((reply) => (
//                 <ReplyCommentDesc key={reply.commentId}>
//                   <CommentHead>
//                   <ReplyCommentIcon><Arrow /></ReplyCommentIcon>
//                     <CommentNickName>{reply.nickname}</CommentNickName>
//                     <CommentWrittenTime>{formatDate(reply.commentWrittenTime)}</CommentWrittenTime>
//                     <CommentReWrite>
//                       <button className="replycomment" onClick={() => onClickShowReplyWrite(reply.commentId)}>대댓글</button>
//                     </CommentReWrite>
//                     <CommentLike>
//                       <button className="like" onClick={() => onClickCommentLike(reply.commentId)}>좋아요</button>
//                     </CommentLike>
//                   </CommentHead>
//                   <CommentArr>
//                     <CommentBody>{reply.commentBody}</CommentBody>
//                     <CommentLikeCount>
//                       <Heart />
//                       {reply.commentLikeCount}
//                     </CommentLikeCount>
//                   </CommentArr>
//                 </ReplyCommentDesc>
//               ))}
//             {showReplyInput.get(comment.commentId) && (
//               <CommentReplyWrite>
//                 <textarea
//                   className="commentreply"
//                   cols="160"
//                   rows="3"
//                   value={replyCommentInput.get(comment.commentId) || ""}
//                   onChange={(e) => onChangeReplyComment(e, comment.commentId)}
//                 ></textarea>
//                 <CommentReplyWriteButton onClick={() => onClickWriteReplyComment(comment.commentId)}>
//                   댓댓글 작성하기
//                 </CommentReplyWriteButton>
//               </CommentReplyWrite>
//             )}
//             <hr></hr>
//           </Comment>
//         </CommentDesc>
//       ))}
//     </>
//   );
// };

// export default WriteComment;
