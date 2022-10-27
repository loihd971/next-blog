import { PostType } from "@/utils/sharedType";
import React from "react";
import {
  Container,
  Card,
  Row,
  Text,
  Col,
  Spacer,
  styled,
  Grid,
} from "@nextui-org/react";
import styles from "@/styles/Header.module.scss";
import { PostCard } from "@/components/PostCard";

function PostList({ postList }: { postList: PostType[] }) {
  const CustomGridTrending = styled(Grid, {
    width: "300px",
    paddingTop: "10px",
    height: "300px",
    backgroundColor: "pink",
    position: "sticky !important",
    top: "100px !important",
  });

  // const CustomGridRelatest = styled(Grid, {
  //   width: "400px",
  //   height: "300px",
  //   backgroundColor: "pink",
  //   marginTop: "125px",
  //   position: 'absolute',
  //   top: '500px'
  // });

  return (
    <div className={styles.content_container}>
      <div className={styles.content_container__left}>
        <Grid.Container gap={2}>
          {postList.map((item, index) => (
            <Grid xs={8} sm={4} key={index}>
              <PostCard post={item} />
            </Grid>
          ))}
        </Grid.Container>
      </div>
      <div className={styles.content_container__right}>
        <Grid.Container direction="column" justify="center">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
            recusandae eveniet aspernatur, quam a dignissimos saepe sunt quis
            impedit facilis nam possimus modi commodi tempora aperiam hic non
            excepturi in!
          </p>
          <CustomGridTrending>ok</CustomGridTrending>
          {/* <CustomGridRelatest>fid</CustomGridRelatest> */}
        </Grid.Container>
      </div>
    </div>
  );
}

export default PostList;
