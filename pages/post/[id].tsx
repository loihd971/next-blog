import { PostType } from "@/utils/sharedType";
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Container,
  Card,
  Row,
  Text,
  Col,
  Spacer,
  Grid,
  useTheme,
  Avatar,
  Input,
  Button,
  Tooltip,
} from "@nextui-org/react";
import styles from "@/styles/PostList.module.scss";
import CustomTab from "@/components/CustomTab";
import TabContentChildren from "@/components/TabContentChildren";
import Image from "next/image";
import axios from "axios";
import {
  FaRegCommentAlt,
  FaRegHeart,
  FaRegShareSquare,
  FaEllipsisH,
} from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import moment from "moment";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import CustomRichEditor from "@/components/CustomRichEditor";
import { toast } from "react-toastify";
import CustomComment from "@/components/CustomComment";
import { FORMAT_TIME } from "@/utils/constant";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { useRouter } from "next/router";
import postSlice from "@/redux/postSlice";

type Props = {};

export default function Post({ relatedPost }: Props | any) {
  const router = useRouter();
  const commentSectionRef = useRef<any>(null);
  const { data: session }: any = useSession();
  const { theme, isDark } = useTheme();
  const [tabContent, setTabContent] = useState([]);
  const [comment, setComment] = useState(undefined);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [commentList, setCommentList] = useState<any>([]);
  const [isCommented, setIsCommented] = useState(1);
  const [author, setAuthor] = useState<any>({});
  const [post, setPost] = useState<any>({});
  const isFollowing = author?.follower?.includes(session?.user?.id);
  const [loading, setLoading] = useState(true);

  const securePage = async () => {
    if (!session) {
      signIn();
    } else {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   securePage();
  // }, []);

  const {
    query: { id },
  } = router;

  const handleToggleComment = () => {
    setEditorVisible(true);
  };
  const getPostDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/post/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowUser = async (type: string) => {
    const body = {
      authorId: author._id,
      followerId: session?.user?.id,
      type,
    };
    try {
      await axios.post(`http://localhost:3000/api/user/follow`, body);
      getAuthor();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    id && getPostDetail();
  }, [id]);

  const getTabContent = async () => {
    try {
      const res: any = await axios.get(`http://localhost:3000/api/post`);
      setTabContent(res.data.postList);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentList = async () => {
    try {
      const res: any = await axios.get(
        `http://localhost:3000/api/comment/${post?._id}`
      );

      setCommentList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyComment = async (parentId: string | null, value: string) => {
    const body = {
      userId: session?.user?.id,
      postId: post?._id,
      userAvatar: session?.user?.image,
      userName: session?.user?.name,
      description: value,
      parentCommentId: parentId,
    };

    try {
      const res: any = await axios.post(
        `http://localhost:3000/api/comment`,
        body
      );
      setComment(undefined);
      setIsCommented(Math.random());
      toast.success("Reply comment successfully!.");
    } catch (error: any) {
      toast.success(error);
    }
  };

  const handleEditComment = async (id: string | null, value: string) => {
    const body = {
      userId: session?.user?.id,
      postId: post?._id,
      userAvatar: session?.user?.image,
      userName: session?.user?.name,
      description: value,
    };
    try {
      const res: any = await axios.put(
        `http://localhost:3000/api/comment/${id}`,
        body
      );

      setIsCommented(Math.random());
      toast.success("Edit comment successfully!.");
    } catch (error: any) {
      toast.success(error);
    }
  };

  const handleLikePost = async () => {
    try {
      await axios.post(`http://localhost:3000/api/post/${post?._id}`, {
        userId: session?.user?.id,
      });
      getPostDetail();
      setIsCommented(Math.random());
    } catch (error: any) {
      toast.success(error);
    }
  };
  const handleLikeComment = async (id: string | null) => {
    try {
      await axios.post(`http://localhost:3000/api/comment/${id}`, {
        type: "like",
        userId: session?.user?.id,
      });

      setIsCommented(Math.random());
    } catch (error: any) {
      toast.success(error);
    }
  };
  const handleDislikeComment = async (id: string | null) => {
    try {
      await axios.post(`http://localhost:3000/api/comment/${id}`, {
        type: "dislike",
        userId: session?.user?.id,
      });

      setIsCommented(Math.random());
    } catch (error: any) {
      toast.success(error);
    }
  };

  const getAuthor = async () => {
    if (post?.userId) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${post?.userId}`
        );
        setAuthor(res.data);
      } catch (error: any) {
        console.log(error);
        toast.success(error);
      }
    }
  };

  useEffect(() => {
    if (post?._id) {
      getCommentList();
      getAuthor();
    }
  }, [post?._id, isCommented, isFollowing]);

  const getCommentTree = (arr: any[]) => {
    const tree: any[] = [];
    const lookup: any = {};
    arr.forEach((item) => {
      lookup[item._id] = item;
      lookup[item._id].children = [];
    });
    arr.forEach((record) => {
      if (record.parentCommentId !== null) {
        lookup[record.parentCommentId]?.children.push(record);
      } else {
        tree.push(record);
      }
    });
    return tree;
  };

  const renderComment = useMemo(() => {
    return getCommentTree(commentList)?.map((item: any) => (
      <CustomComment
        key={item._id}
        comment={item}
        onComment={(e: any, id: string) => handleReplyComment(id, e)}
        onEdit={(e: any, id: string) => handleEditComment(id, e)}
        onLike={(id: string) => handleLikeComment(id)}
        onDislike={(id: string) => handleDislikeComment(id)}
      />
    ));
  }, [commentList]);

  const handleComment = (comment: any) => {
    setComment(comment);
  };

  const handleSubmitComment = async () => {
    const body = {
      userId: session?.user?.id,
      postId: post?._id,
      userAvatar: session?.user?.image,
      userName: session?.user?.name,
      description: comment,
    };
    try {
      const res: any = await axios.post(
        `http://localhost:3000/api/comment`,
        body
      );
      setComment(undefined);
      setIsCommented(Math.random());
      toast.success("Comment successfully!.");
    } catch (error: any) {
      toast.success(error);
    }
  };

  useEffect(() => {
    getTabContent();
  }, []);

  const tabOptions = [
    {
      label: "Related",
      key: "related-post",
      children: <TabContentChildren postList={relatedPost} />,
    },
    {
      label: "Latest",
      key: "latest-post",
      children: <TabContentChildren postList={tabContent} />,
    },
  ];

  return (
    <Grid.Container
      css={{
        minHeight: "calc(100vh - 76px)",
        height: "100%",
        // backgroundImage: `${
        //   isDark
        //     ? 'url("/image/postlist_dark.svg") !important'
        //     : 'url("/image/postlist_light.svg") !important'
        // } `,
        width: "100%",
        background: theme?.colors.red900.value,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid xs={12} sm={3} md={3} lg={3} xl={2}></Grid>
      <Grid xs={12} sm={6} md={6} lg={6} xl={7}>
        <div className={styles.post__detail}>
          <div className={styles.postdetail__icon_group}>
            <div className={styles.postdetail__icon}>
              <FaRegHeart
                className={styles.icon}
                onClick={() => {
                  if (!session) {
                    signIn();
                  }
                  handleLikePost();
                }}
              />{" "}
              <Text h6>{post?.likes?.length || 0}</Text>
            </div>
            <div
              className={styles.postdetail__icon}
              onClick={() =>
                commentSectionRef?.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              <FaRegCommentAlt className={styles.icon} />{" "}
              <Text h6>{commentList?.length}</Text>
            </div>
            <div className={styles.postdetail__icon}>
              <FacebookShareButton
                url={"https://github.com/loihd971/next-blog"}
                hashtag={post?.tags}
              >
                <FaRegShareSquare className={styles.icon} />{" "}
                {/* <Text h6>1000</Text> */}
              </FacebookShareButton>
            </div>
            <div className={styles.postdetail__icon}>
              <FaEllipsisH className={styles.icon} />
            </div>
          </div>
          <div
            className={styles.post__content}
            style={{ border: `1px solid ${theme?.colors.border.value} ` }}
          >
            <div className={styles.post__info}>
              <div className={styles.post__info__left}>
                <Avatar
                  pointer
                  size="lg"
                  src={author?.avatar}
                  color="secondary"
                  bordered
                />
                <div className={styles.post__info__author}>
                  <p>{author?.name}</p>
                  <p>{moment(post?.createdAt).format(FORMAT_TIME)}</p>
                </div>
              </div>
              {author._id !== session?.user?.id &&
                (isFollowing ? (
                  <Tooltip content="Unfollow user" color="primary">
                    <Button
                      color="secondary"
                      size="sm"
                      css={{
                        display: "flex",
                        alignItems: "center",
                        "@xs": {
                          w: "12%",
                        },
                      }}
                      onClick={() => {
                        if (!session) {
                          signIn();
                        }
                        handleFollowUser("unfollow");
                      }}
                    >
                      <SlUserFollowing
                        className={styles.post__comment__followicon}
                      />
                      Following
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip content="Follow user" color="primary">
                    <Button
                      size="sm"
                      css={{
                        display: "flex",
                        alignItems: "center",
                        "@xs": {
                          w: "12%",
                        },
                      }}
                      color="secondary"
                      onClick={() => {
                        if (!session) {
                          signIn();
                        }
                        handleFollowUser("follow");
                      }}
                    >
                      <SlUserFollow
                        className={styles.post__comment__followicon}
                      />
                      Follow
                    </Button>
                  </Tooltip>
                ))}
            </div>
            <div className={styles.post_description}>
              <Text h1>{post?.title}</Text>
              <Text h6>
                {post?.tags?.map((item: any, index: number) => (
                  <span key={index}>{item}&nbsp;</span>
                ))}
              </Text>
              <Text css={{ paddingBottom: "100px" }} h6>
                {post?.description}{" "}
              </Text>

              {/* <Image width={200} height={200} src={post?.thumbnail}/> */}
              <iframe
                width="100%"
                height="300"
                src={post?.videoUrl}
                frameBorder="0"
                allowFullScreen={true}
                title="posted video"
              ></iframe>
              <Text
                h6
                dangerouslySetInnerHTML={{ __html: post?.content }}
              ></Text>
            </div>
            <hr ref={commentSectionRef} />
            <br />
            <div className={styles.post__comment}>
              <div className={styles.post__comment__header}>
                <span>All comments({commentList?.length})</span>{" "}
              </div>
              <br />
              <div
                className={styles.editor__wrapper}
                style={{ border: isEditorVisible ? "unset" : "1px solid" }}
                onClick={() => {
                  if (!session) {
                    signIn();
                  }
                  handleToggleComment();
                }}
              >
                {!isEditorVisible && (
                  <Text h6 css={{ marginLeft: "10px", marginBottom: "0px" }}>
                    Add the discussion...
                  </Text>
                )}
                <CustomRichEditor
                  currentValue={comment}
                  style={{
                    display: isEditorVisible ? "block" : "none",
                  }}
                  type="create"
                  onChange={(e: any) => {
                    if (!session) {
                      signIn();
                    }
                    handleComment(e);
                  }}
                />
                {isEditorVisible && (
                  <div className={styles.editor__action__button}>
                    <Button
                      css={{ display: "flex", alignItems: "center" }}
                      color="secondary"
                      size="xs"
                      onClick={() => {
                        if (!session) {
                          signIn();
                        }
                        handleSubmitComment();
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      css={{ display: "flex", alignItems: "center" }}
                      color="secondary"
                      size="xs"
                      onClick={() => setEditorVisible(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <br />
              <br />
              {renderComment}
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        xs={12}
        sm={3}
        md={3}
        lg={3}
        xl={3}
        justify="center"
        css={{ padding: "24px" }}
      >
        <div
          style={{
            padding: "2px",
          }}
          className={styles.tab__post}
        >
          <CustomTab
            tabOptions={tabOptions}
            defaultActive="latest-post"
            onChange={(tab: string) => console.log(tab)}
          />
        </div>
      </Grid>
    </Grid.Container>
  );
}

export const getStaticProps = async ({ params }: any) => {
  try {
    const posts = await axios.get(
      `http://localhost:3000/api/post/related-post`,
      {
        params: {
          postId: params.id,
        },
      }
    );

    return {
      props: {
        relatedPost: posts.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        relatedPost: []
      },
    };
  }
};
export async function getStaticPaths() {
  try {
    const res: any = await axios.get(`http://localhost:3000/api/post`);

    const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = posts?.map((post: any) => ({
      params: { id: post._id },
    }));

    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
}
