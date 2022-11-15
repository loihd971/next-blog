import { Avatar, Container, Text, useTheme } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/About.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaJsSquare } from "react-icons/fa";
import Slider from "react-slick";
import { CustomSliderItem } from "@/components/CustomSliderItem";
import useTrans from "@/utils/useTranslate";

const About = () => {
  const trans = useTrans();
  const { data: session }: any = useSession();
  const { theme }: any = useTheme();
  const [author, setAuthor] = useState<any>({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getAuthor = async () => {
    if (session?.user?.id) {
      try {
        const res = await axios.get(
          `https://evanloi971.vercel.app/api/user/${session?.user?.id}`
        );
        setAuthor(res.data);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <div
      id="about"
      className={styles.about__container}
      style={{ background: theme?.colors.red900.value }}
    >
      <div className={styles.about__info__wrapper}>
        <div className={styles.about__info}>
          <FaJsSquare className={styles.about__logo} />

          <Text h6>EvanLoi</Text>
        </div>
        <div className={styles.about__quote}>
          <Text h6>
            {" "}
            <b style={{ fontSize: "30px", verticalAlign: "bottom" }}>❝</b> 
            {trans.home.about.intro}
            <b
              style={{
                fontSize: "30px",
                verticalAlign: "top",
              }}
            >
              ❞
            </b>
          </Text>
        </div>
      </div>
      {/* <div className={styles.slider__wrapper}>
        <Text h6>Trending Post</Text>
        <Slider {...settings}>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
          <div>
            <CustomSliderItem />
          </div>
        </Slider>
      </div>
    */}
    </div>
  );
};

export default About;
