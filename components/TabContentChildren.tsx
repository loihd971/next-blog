import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/PostList.module.scss";
import { Text, theme } from "@nextui-org/react";
import { FaEllipsisH, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import moment from "moment";
type Props = {};

export default function TabContentChildren({ postList }: Props | any) {
  console.log(postList);
  
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [hoveredEl, setHoveredEl] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [selectedEl, setSelectedEl] = useState(null);
  const handleClick = (e: React.FormEvent<HTMLInputElement>, record: any) => {
    e.preventDefault();
    router.push({
      pathname: `/post/[id]`,
      query: { id: record._id },
      locale: router.locale,
    } as any);
  };

  return (
    <div>
      <ul style={{ margin: "0", paddingTop: "5px" }}>
        {postList?.map((item: any) => (
          <li
            key={item._id}
            style={{
              position: "relative",
              display: "flex",
              borderRadius: "5px",
              padding: "2px",
              alignItems: "center",
              background: `${
                selectedEl === item._id
                  ? theme.colors.secondaryBorder.value
                  : isHover && item._id === hoveredEl
                  ? theme.colors.border.value
                  : "unset"
              }`,
            }}
            onClick={(e: any) => {
              setSelectedEl(item._id);
              handleClick(e, item);
            }}
            onMouseOver={() => {
              setHoveredEl(item._id);
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setHoveredEl(null);
              setIsHover(false);
            }}
          >
            <Image
              width={50}
              height={50}
              className={styles.post__image}
              alt={item?.description}
              src={item?.thumbnail}
            />
            <div>
              <Text h5>{item.title?.slice(0, 20)}...</Text>
              {/* <Text h5>{item.description?.slice(0, 20)}...</Text> */}
              <Text css={{wordWrap: 'break-word'}} h6>{item.tags}</Text>
              {isHover && item._id === hoveredEl && (
                <div
                  className="tab-child__icon"
                  style={{
                    width: "80px",
                    position: "absolute",
                    top: "50%",
                    left: "90%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <FaRegHeart className={styles.tabchild__icon} />
                  <FaEllipsisH className={styles.tabchild__icon} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
