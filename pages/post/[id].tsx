import axios from "axios";
import React from "react";
import styles from '@/styles/PostCrud.module.scss'

type Props = {data: any};

export default function Post({data}: Props) {
    console.log(data);
    
  return <div className={styles.container}>[id]</div>;
}

export const getServerSideProps = async ({ params }: any) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/post/${params.id}`
    );
    console.log(res);
    return {
      props: {
        data: res.data
      },
    };
  } catch (error) {
    console.log('error');
    return {
      props: {},
    };
  }
};
