import React, { useState, useEffect } from "react";
import styles from "@/styles/AboutMe.module.scss";
import { Avatar, Grid, Link, Text, Tooltip, useTheme } from "@nextui-org/react";
import axios from "axios";
import {
  FaBirthdayCake,
  FaFacebookSquare,
  FaFileDownload,
  FaGithub,
  FaMapMarkerAlt,
  FaSlack,
  FaTwitter,
} from "react-icons/fa";
import moment, { locale } from "moment";
import { FORMAT_SECOND_TIME } from "@/utils/constant";
import { Tb2Fa } from "react-icons/tb";
import { useRouter } from "next/router";
import { getSession, signIn, useSession } from "next-auth/react";
type Props = {};

function AboutMe() {
  const router = useRouter();
  const { data: session }: any = useSession();
  const { theme, isDark } = useTheme();
  const [posts, setPosts] = useState(0);
  const [user, setUser] = useState<any>({});

  const getUserDetail = async () => {
    try {
      const res = await axios.get(
        `${process.env.BASE_URL}/api/user/${router.query.id}`
      );
      setUser(res.data);
    } catch (error) {}
  };

  const getPostByUser = async () => {
    try {
      const res = await axios.get(`${process.env.BASE_URL}/api/post`, {
        params: { userId: user._id },
      });

      setPosts(res.data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getPostByUser();
    }
  }, [user]);

  useEffect(() => {
    getUserDetail();
  }, [router?.query?.id]);

  // if(router.isFallback){
  //   return "isLoading..."
  // }

  return (
    <Grid.Container
      gap={2}
      justify="center"
      css={{
        background: theme?.colors.red900.value,
      }}
    >
      <Grid xs={10} sm={10} md={10} lg={10} xl={10}>
        <div
          className={styles.aboutme__main}
          style={{ background: theme?.colors.red900.value }}
        >
          <div
            className={styles.aboutme__stack}
            style={{ background: theme?.colors.accents3.value }}
          >
            <Avatar
              className={styles.aboutme__avatar}
              css={{
                border: `10px solid ${theme?.colors.red900.value}`,
                width: "200px",
                height: "200px",
              }}
              src={session?.user?.image}
            />
            <div className={styles.aboutme__intro}>
              <Text h3>{user?.name}</Text>{" "}
              <Text>
                I&apos;m a Software Engineer, passionate full stack web
                developer.
              </Text>
              <div className={styles.aboutme__contact__icon}>
                <div className={styles.aboutme__contact__icon__location}>
                  <FaMapMarkerAlt className={styles.link__icon} />
                  <Text h6>Vietnamese</Text>
                </div>
                <div className={styles.aboutme__contact__icon__location}>
                  <FaBirthdayCake className={styles.link__icon} />
                  <Text h6>
                    Joined on {moment(user?.createdAt).format("ll")}
                  </Text>
                </div>
                <div className={styles.aboutme__contact__icon__location}>
                  <Link
                    style={{ color: theme?.colors.accents9.value }}
                    target="_blank"
                    href="https://github.com/loihd971"
                  >
                    <FaGithub className={styles.contact__icon} />{" "}
                  </Link>
                  <FaTwitter className={styles.contact__icon} />{" "}
                  <FaFacebookSquare className={styles.contact__icon} />
                  <FaSlack className={styles.contact__icon} />
                  <Tooltip content={<Text h6>Download My Resume</Text>}>
                    <a
                      href="/mycv.pdf"
                      download="mycv.pdf"
                      className={styles.downloadcv__section}
                    >
                      <FaFileDownload
                        style={{ fill: theme?.colors.accents9.value }}
                        className={styles.downloadcv__section__icon}
                      />
                    </a>
                  </Tooltip>
                </div>
              </div>
              <div className={styles.aboutme__contact__icon__work}>
                <Text h6>Work</Text>
                <p>Software Engineer at NashTech</p>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid xs={10} sm={10} md={10} lg={10} xl={10}>
        <div
          className={styles.aboutme__main_work}
          style={{ background: theme?.colors.red900.value }}
        >
          <div
            className={styles.aboutme__skill}
            style={{ background: theme?.colors.accents3.value }}
          >
            <div className={styles.skill__item}>
              <Text h6># Follower: {user?.follower?.length || 0}</Text>
            </div>
            <div className={styles.skill__item}>
              <Text h6># Post published: {posts || 0}</Text>
            </div>
            <div className={styles.skill__item}>
              <Text h6># Expers: 5</Text>
            </div>
            <div className={styles.skill__item}>
              <Text h6># Skill</Text>
              <p>
                Javascript, HTML, CSS, SCSS, Tailwind, Bootstrap, PHP,
                Websoket.IO , Redux, Redux-saga, Vuex ,Ant, Material UI,
                Flowbite UI, Semantic UI, Next UI, Git, Reactjs, Nextjs, Vuejs,
                Nodejs, Laravel, MongoDB, Mysql, SQL server, Git, VS code,
                PyCharm, Vs code studio, Scum model
              </p>
            </div>
          </div>
        </div>
      </Grid>
    </Grid.Container>
  );
}

export default AboutMe;

// export const getStaticProps = async ({ params }: any) => {
//   try {
//     const res = await axios.get(`${process.env.BASE_URL}/api/user/${params.id}`);

//     return {
//       props: {
//         user: res.data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {},
//     };
//   }
// };
// export async function getStaticPaths() {
//   try {
//     const res: any = await axios.get(`${process.env.BASE_URL}/api/user`);

//     const paths = res?.data?.map((user: any) => ({
//       params: { id: user._id },
//     }));

//     return { paths, fallback: true };
//   } catch (error) {
//     return { paths: [], fallback: true };
//   }
// }
