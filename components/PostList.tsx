import { PostType } from "@/utils/sharedType";
import React from "react";
import {
  Container,
  Card,
  Row,
  Text,
  Col,
  Spacer,
  Grid,
} from "@nextui-org/react";
import styles from "@/styles/Header.module.scss";
import { PostCard } from "@/components/PostCard";
import Slider from "react-slick";

function PostList({ postList }: { postList: PostType[] }) {
  return (
    <Grid.Container gap={2}>
      <Grid xs={12} sm={8} md={8} lg={8} xl={9}>
        <Grid.Container gap={2}>
          {postList.map((item, index) => (
            <Grid xs={12} sm={12} md={6} lg={6} xl={4} key={index}>
              <PostCard post={item} />
            </Grid>
          ))}
        </Grid.Container>
      </Grid>
      <Grid xs={12} sm={4} md={4} lg={4} xl={3}>
        ok
      </Grid>
    </Grid.Container>
  );
}

export default PostList;
