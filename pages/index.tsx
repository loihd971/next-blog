import About from "@/components/About";
import PostList from "@/components/PostList";
import { PostType } from "@/utils/sharedType";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { InferGetServerSidePropsType } from "next";
import { loadPosts } from "@/services/api";

export default function Home({
  postList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>EvanLoi Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostList postList={postList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res: any = await loadPosts();

  return {
    props: { postList: res?.data?.postList },
  };
};
