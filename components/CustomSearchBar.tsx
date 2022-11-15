import {
  Avatar,
  Card,
  Grid,
  Input,
  Loading,
  theme,
  Modal,
  Text,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Image from "next/image";
import moment from "moment";
import { FORMAT_TIME } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {};

function CustomSearchBar({}: Props) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [searchContent, setSearchContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    value && setIsLoading(true);

    const res =
      value &&
      setTimeout(() => {
        axios
          .get(`http://localhost:3000/api/post/search`, {
            params: { title: value },
          })
          .then((data: any) => {
            console.log(data);

            setSearchContent(data.data.postList || []);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 1000);

    return () => clearTimeout(res);
  }, [value]);

  const handleNavigatePostDetail = (
    e: React.FormEvent<HTMLInputElement>,
    value: any
  ) => {
    e.preventDefault();
    setIsModalVisible(false);
    router.push({
      pathname: "/post/[id]",
      query: { id: value._id },
      locale: router.locale,
    } as any);
  };

  return (
    <div className="content-wrapper__search">
      <HiMagnifyingGlass
        fill="var(--nextui-colors-accents6)"
        cursor="pointer"
        fontWeight="bold"
        size={20}
        onClick={handleOpenModal}
      />

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={isModalVisible}
        onClose={handleCloseModal}
        scroll
        blur
        width="600px"
      >
        <Modal.Header>
          <Input
            css={{ marginTop: "20px !important" }}
            clearable
            bordered
            fullWidth
            value={value}
            color="primary"
            size="lg"
            onClearClick={() => setSearchContent([])}
            placeholder="Search"
            onChange={(e: any) => setValue(e.target.value)}
            contentLeft={
              <HiMagnifyingGlass
                fill="var(--nextui-colors-accents6)"
                size={16}
              />
            }
          />
        </Modal.Header>
        <Modal.Body
          css={{
            minHeight: "300px",
            scrollbarWidth: "5px !important",
            overflowX: "hidden",
          }}
        >
          {isLoading && <Loading color="primary">Loading data</Loading>}

          <Grid.Container gap={2}>
            <Card>
              {searchContent?.length > 0 && (
                <Card.Body>
                  {searchContent?.map((item: any) => (
                    <div
                      onClick={(e: any) => handleNavigatePostDetail(e, item)}
                      key={item._id}
                      style={{
                        display: "flex !important",
                        justifyContent: "center",
                        border: `1px solid ${theme.colors.accents3.value}`,
                        marginBottom: "12px",
                        borderRadius: "10px",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        width={50}
                        height={50}
                        alt={item?.description}
                        src={item?.thumbnail}
                      />
                      <>
                        <p>{item?.title} </p>

                        <span>{item?.description} -</span>
                        <span>
                          &nbsp;{moment(item?.createdAt).format(FORMAT_TIME)}
                        </span>
                      </>
                    </div>
                  ))}
                </Card.Body>
              )}
            </Card>
          </Grid.Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CustomSearchBar;
