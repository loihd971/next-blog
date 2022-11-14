import { PostType } from "@/utils/sharedType";
import React from "react";
import {
  Grid,
  useTheme,
} from "@nextui-org/react";
import styles from "@/styles/PostList.module.scss";
import { PostCard } from "@/components/PostCard";
import CustomTab from "@/components/CustomTab";
import TabContentChildren from "./TabContentChildren";

function PostList({ postList }: { postList: PostType[] }) {
  const { theme, isDark } = useTheme();

  const tabOptions = [
    {
      label: "Related",
      key: "related-post",
      children: <TabContentChildren postList={postList} />,
    },
    {
      label: "Latest",
      key: "latest-post",
      children: <TabContentChildren postList={postList} />,
    },
  ];

  return (
    <Grid.Container
      gap={2}
      css={{
        minHeight: "calc(100vh - 76px)",
        height: "100%",
        // backgroundImage: `${
        //   isDark
        //     ? 'url("/image/postlist_dark.svg") !important'
        //     : 'url("/image/postlist_light.svg") !important'
        // } `,
        background: theme?.colors.red900.value,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: 'relative'
      }}
    >
      <Grid xs={12} sm={3} md={3} lg={3} xl={2}>

      </Grid>
      <Grid xs={12} sm={6} md={6} lg={6} xl={7}>
        <Grid.Container gap={2}>
          {postList?.map((item, index) => (
            <Grid xs={12} sm={12} md={6} lg={6} xl={4} key={index}>
              <PostCard post={item} />
            </Grid>
          ))}
        </Grid.Container>
      </Grid>
      <Grid
        xs={12}
        sm={3}
        md={3}
        lg={3}
        xl={3}
        justify="center"
        css={{ padding: "24px", position: 'sticky !important', top: "0px"}}
      >
        <div
          className={styles.tab__post}
        >
          <CustomTab
            tabOptions={tabOptions}
            defaultActive="related-post"
            onChange={(tab: string) => console.log(tab)}
          />
        </div>
      </Grid>
    </Grid.Container>
  );
}

export default PostList;
