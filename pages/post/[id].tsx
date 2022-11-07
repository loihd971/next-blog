import { PostType } from "@/utils/sharedType";
import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import moment from "moment";
import { SlUserFollow } from "react-icons/sl";
import CustomRichEditor from "@/components/CustomRichEditor";

type Props = { data: any };

export default function Post({ data }: Props) {
  const { data: session }: any = useSession();
  const { theme, isDark } = useTheme();
  const [tabContent, setTabContent] = useState([]);
  const [comment, setComment] = useState(undefined);

  const getTabContent = async () => {
    try {
      const res: any = await axios.get("http://localhost:3000/api/post");
      setTabContent(res.data.postList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (comment: any) => {
    setComment(comment);
  };

  useEffect(() => {
    getTabContent();
  }, []);

  const tabOptions = [
    {
      label: "Related Post",
      key: "related-post",
      children: <TabContentChildren postList={tabContent} />,
    },
    {
      label: "Latest Post",
      key: "latest-post",
      children: <TabContentChildren postList={tabContent} />,
    },
  ];

  return (
    <Grid.Container
      // gap={2}
      css={{
        minHeight: "calc(100vh - 76px)",
        height: "100%",
        backgroundImage: `${
          isDark
            ? 'url("/image/postlist_dark.svg") !important'
            : 'url("/image/postlist_light.svg") !important'
        } `,
        // width: "100%",
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
              <FaRegHeart className={styles.icon} /> <Text h6>1</Text>
            </div>
            <div className={styles.postdetail__icon}>
              <FaRegCommentAlt className={styles.icon} /> <Text h6>1</Text>
            </div>
            <div className={styles.postdetail__icon}>
              <FaRegShareSquare className={styles.icon} /> <Text h6>1</Text>
            </div>
            <div className={styles.postdetail__icon}>
              <FaEllipsisH className={styles.icon} /> <Text h6>1</Text>
            </div>
          </div>
          <div
            className={styles.post__content}
            style={{ backgroundColor: theme?.colors.background.value }}
          >
            <div className={styles.post__info}>
              <div className={styles.post__info__left}>
                <Avatar
                  pointer
                  size="lg"
                  src={session?.user?.image}
                  color="secondary"
                  bordered
                />
                <div className={styles.post__info__author}>
                  <p>{session?.user?.name}</p>
                  <p>{moment(data?.createdAt).format("YYYY-MM-DD")}</p>
                </div>
              </div>
              <Button
                css={{ display: "flex", alignItems: "center" }}
                color="secondary"
                size="xs"
              >
                <SlUserFollow className={styles.post__comment__followicon} />
                Follow
              </Button>
            </div>
            <div className={styles.post_description}>
              <Text h1>{data?.title}</Text>
              <Text h6>
                {data?.tags?.map((item: any, index: number) => (
                  <span key={index}>#{item}</span>
                ))}
              </Text>
              <Text h6>{data?.description}</Text>
            </div>
            <hr />
            <div className={styles.post__comment}>
              <div className={styles.post__comment__header}>
                <span>All comments(3)</span>{" "}
              </div>
              <div>
                <CustomRichEditor onChange={handleComment} />
              </div>
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
          style={{ border: `3px solid ${theme?.colors.border.value}` }}
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
    const res = await axios.get(`http://localhost:3000/api/post/${params.id}`);
    return {
      props: {
        data: res.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
export async function getStaticPaths() {
  try {
    const res: any = await axios.get(`http://localhost:3000/api/post`);
    const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post: any) => ({
      params: { id: post._id },
    }));

    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
}
