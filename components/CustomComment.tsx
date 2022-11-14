import React, { useState } from "react";
import { Text, Button, Avatar, theme } from "@nextui-org/react";
import CustomRichEditor from "./CustomRichEditor";
import moment from "moment";
import { FORMAT_DATE_TIME } from "@/utils/constant";
import { useSession } from "next-auth/react";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

type Props = {};

function CustomComment({
  comment,
  disabledReply = false,
  onComment,
  onEdit,
  onLike,
  onDislike,
  isChild = false,
  ...rest
}: Props | any) {
  const { data: session }: any = useSession();
  const [isReply, setIsReply] = useState(false);
  const [isDisabledAction, setIsDisabledAction] = useState(disabledReply);
  const [currentValue, setCurrentValue] = useState(comment.description);
  const [isEdit, setIsEdit] = useState(false);

  const nestedComments = (comment?.children)?.map((item: any) => {
    return (
      <CustomComment
        isChild={true}
        key={item._id}
        comment={item}
        onEdit={onEdit}
        onComment={onComment}
        onLike={onLike}
        onDislike={onDislike}
      />
    );
  });

  const isLiked = comment?.likes?.includes(session?.user?.id);
  const isDisliked = comment?.dislikes?.includes(session?.user?.id);

  return (
    <div className="custom-comment__container">
      <a
        href={`#${comment._id}`}
        className="custom-border__link"
        style={{ backgroundColor: theme.colors.accents3.value }}
      ></a>
      <div
        id={comment._id}
        {...rest}
        className="custom-comment__wrapper"
        style={{
          paddingLeft: "20px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div className="comment-user__avatar">
            <span
              className="hori-border"
              style={{ backgroundColor: theme.colors.accents3.value }}
            ></span>
            <Avatar
              width={50}
              height={50}
              css={{ marginRight: "10px" }}
              src={comment?.userAvatar}
            />
          </div>
          <div className="custom-comment-section">
            {!isEdit && (
              <div
                style={{
                  border: `1px solid ${theme.colors.accents3.value}`,
                  borderRadius: "5px",
                  padding: "10px 0 0 10px",
                }}
              >
                <Text h6>
                  {comment.userName}/
                  {moment(comment?.createdAt).format(FORMAT_DATE_TIME)}
                </Text>
                <Text
                  key={comment._id}
                  h1
                  dangerouslySetInnerHTML={{ __html: comment?.description }}
                ></Text>
              </div>
            )}

            <div className="custom-comment__action">
              {isDisabledAction !== 1 && !isEdit && (
                <div
                  className="custom-comment__text reply"
                  onClick={() => {
                    setIsReply(!isReply);
                  }}
                >
                  <FaReply />
                  &nbsp;Reply
                </div>
              )}
              {session?.user?.id === comment?.userId && (
                <span
                  className="custom-comment__text edit"
                  onClick={() => {
                    setIsEdit(true);
                    setIsReply(!isReply);
                  }}
                >
                  <FaRegEdit />
                  &nbsp;Edit
                </span>
              )}
              <div
                style={{ color: isLiked ? theme.colors.primary.value : "" }}
                className="custom-comment__text"
                onClick={() => onLike(comment?._id)}
              >
                <AiOutlineLike />

                <span>&nbsp;{comment?.likes?.length || 0}</span>
              </div>
              <div
                className="custom-comment__text"
                style={{ color: isDisliked ? theme.colors.red600.value : "" }}
                onClick={() => onDislike(comment?._id)}
              >
                <AiOutlineDislike
                 
                />
                <span>&nbsp;{comment?.dislikes?.length || 0}</span>
              </div>
            </div>

            {isReply && (
              <>
                <CustomRichEditor
                  currentValue={isEdit ? currentValue : undefined}
                  onChange={(e: any) => setCurrentValue(e)}
                />
                <div className="custom-comment__action">
                  <span
                    className="custom-comment__text"
                    onClick={() => {
                      if (isEdit) {
                        setIsEdit(false);
                        onEdit(currentValue, comment?._id);
                      } else {
                        onComment(currentValue, comment?._id);
                      }
                      setIsReply(!isReply);
                    }}
                  >
                    Submit
                  </span>
                  <span
                    className="custom-comment__text"
                    onClick={() => {
                      setIsReply(!isReply);
                      setIsEdit(false);
                    }}
                  >
                    Cancel
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        {nestedComments}
      </div>
    </div>
  );
}

export default CustomComment;
