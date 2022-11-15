import { Avatar, Container, Text, useTheme } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import styles from "@/styles/About.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaJsSquare } from "react-icons/fa";
import Slider from "react-slick";
import { CustomSliderItem } from "@/components/CustomSliderItem";

const About = () => {
  console.log(process.env.BASE_URL);
  
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
          `${process.env.BASE_URL}/api/user/${session?.user?.id}`
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
            <b style={{ fontSize: "30px", verticalAlign: "bottom" }}>❝</b> Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry&apos;s standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.{" "}
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
