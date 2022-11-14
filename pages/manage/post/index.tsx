import styles from "@/styles/PostCrud.module.scss";
import {
  Button,
  Grid,
  Input,
  Modal,
  Row,
  Col,
  Tooltip,
  User,
  styled,
  Text,
  theme as altTheme,
  Table,
  Popover,
  globalCss,
  Pagination,
  useTheme,
} from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import UploadFile from "@/components/UploadFile";
import PostFormModal from "@/components/PostFormModal";
import axios from "axios";
import moment from "moment";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { CrudType, PostEnum, PostType } from "@/utils/sharedType";
import ConfirmModal from "@/components/ConfirmModal";
import { useMediaQuery } from "@/utils/useMediaQuery.js";
import CustomTable, { Cols } from "@/components/CustomTable";
import { FORMAT_TIME } from "@/utils/constant";
import { useSession } from "next-auth/react";

export default function PostCrud() {
  const { data: session }: any = useSession();
  const defaultFilter = {
    page: 1,
    pageSize: 10,
    userId: session?.user?.id,
  };
  const isMd = useMediaQuery(960);
  const [tableData, setTableData] = useState([]);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] =
    useState(false);

  const [isViewPostModalVisible, setIsViewPostModalVisible] = useState(false);
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isDeletePostModalVisible, setIsDeletePostModalVisible] =
    useState(false);
  const [tableTotal, setTableTotal] = useState(0);
  const [initFormData, setInitFormData] = useState<any>([]);
  const [isFilterBlockVisible, setIsFilterBlockVisible] = useState(false);
  const [filters, setFilters] = useState<any>(defaultFilter);
  const { isDark, theme }: any = useTheme();

  const tableColumn: Cols[] = [
    {
      title: "Title",
      key: PostEnum.title,
      // sortable: true,
      searchtype: "text",
      filter: true,
      width: 300,
      dataIndex: PostEnum.title,
    },
    {
      title: "Description",
      width: 300,
      filter: true,
      searchtype: "text",

      key: PostEnum.description,
      dataIndex: PostEnum.description,
      render: (value: any) => {
        return (
          <Tooltip content={value} color="primary">
            <Button auto light>
              {value?.slice(0, 20)}...
            </Button>
          </Tooltip>
        );
      },
    },
    {
      title: "Content",
      width: 300,
      filter: true,
      searchtype: "text",
      key: PostEnum.content,
      dataIndex: PostEnum.content,
      render: (value: any) => {
        return (
          <Tooltip content={value} color="primary">
            <Button auto light>
              {value?.slice(0, 20)}...
            </Button>
          </Tooltip>
        );
      },
    },
    {
      title: "Tags",
      key: PostEnum.tags,
      searchtype: "text",

      filter: true,
      dataIndex: PostEnum.tags,
      width: 300,
    },
    {
      title: "Likes",
      searchtype: "text",

      width: 300,
      key: PostEnum.likes,
      filter: true,
      dataIndex: PostEnum.likes,
    },
    {
      title: "Video Url",
      key: PostEnum.videoUrl,
      filter: true,
      dataIndex: PostEnum.videoUrl,
      searchtype: "text",
      width: 300,
      render: (value: any) => {
        return (
          <Tooltip content={value} color="primary">
            <Button auto light>
              {value?.slice(0, 5)}...
            </Button>
          </Tooltip>
        );
      },
    },
    {
      title: "Image Url",
      key: PostEnum.thumbnail,
      filter: true,
      dataIndex: PostEnum.thumbnail,
      width: 300,
      searchtype: "text",
      render: (value: any) => {
        return (
          <Tooltip content={value} color="primary">
            <Button auto light>
              {value?.slice(0, 5)}...
            </Button>
          </Tooltip>
        );
      },
    },
    {
      title: "Created At",
      key: PostEnum.createdAt,
      filter: true,
      searchtype: "date",

      dataIndex: PostEnum.createdAt,
      width: 300,
      render: (value: any) => {
        return moment(value).format(FORMAT_TIME);
      },
    },
    {
      title: "Updated At",
      key: PostEnum.updatedAt,
      width: 300,
      filter: true,
      searchtype: "date",
      dataIndex: PostEnum.updatedAt,
      render: (value: any) => {
        return moment(value).format(FORMAT_TIME);
      },
    },
    {
      title: "Action",
      key: PostEnum.action,
      dataIndex: PostEnum.action,
      fixed: "right",
      width: 100,
      render: (_: any, record: PostType) => {
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="View Post">
                <IconButton>
                  <HiEye
                    size={20}
                    fill="#979797"
                    onClick={() => handleViewPost(record)}
                  />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit post">
                <IconButton>
                  <HiPencil
                    size={20}
                    fill="#979797"
                    onClick={() => handleEditPost(record)}
                  />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete post"
                color="error"
                onClick={() => handleDeletePost(record)}
              >
                <IconButton>
                  <HiTrash size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      },
    },
  ];

  const IconButton = styled("button", {
    dflex: "center",
    border: "none",
    outline: "none",
    cursor: "pointer",
    padding: "0",
    margin: "0",
    bg: "transparent",
    transition: "$default",
    "&:hover": {
      opacity: "0.8",
    },
    "&:active": {
      opacity: "0.6",
    },
  });

  const handleSubmitCreateForm = async (data: any) => {
    try {
      await axios.post(`${process.env.BASE_URL}/api/post`, data);

      toast.success("Create post successfully!");
      setIsCreatePostModalVisible(false);
    } catch (error) {
    } finally {
      handleFetchTableData({ ...filters, userId: session?.user?.id });
    }
  };

  const handleSubmitEditForm = async (data: any) => {
    try {
      await axios.put(
        `${process.env.BASE_URL}/api/post/${initFormData._id}`,
        data
      );
      toast.success("Edit post successfully!");
      setIsEditPostModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      handleFetchTableData({ ...filters, userId: session?.user?.id });
    }
  };

  const handleSubmitDeleteForm = async (data: any) => {
    try {
      await axios.delete(
        `${process.env.BASE_URL}/api/post/${initFormData._id}`,
        data
      );
      toast.success("Delete post successfully!");
      setIsDeletePostModalVisible(false);
    } catch (error) {
    } finally {
      handleFetchTableData({ ...filters, userId: session?.user?.id });
    }
  };

  const handleFetchTableData = async (filters: any) => {
    try {
      const res = await axios.get(`${process.env.BASE_URL}/api/post`, {
        params: { ...filters, userId: session?.user?.id },
      });

      setTableData(res.data.postList);
      setTableTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      handleFetchTableData({ ...filters, userId: session?.user?.id });
    }
  }, [filters, session?.user?.id]);

  const handleViewPost = (record: PostType) => {
    setInitFormData(record);
    setIsViewPostModalVisible(true);
  };
  const handleEditPost = (record: PostType) => {
    setInitFormData(record);
    setIsEditPostModalVisible(true);
  };

  const handleDeletePost = (record: PostType) => {
    setInitFormData(record);
    setIsDeletePostModalVisible(true);
  };

  const handleCloseDeleteForm = () => {
    setIsDeletePostModalVisible(false);
  };

  const handleTableFilter = (value: any) => {
    setFilters((pre: any) => ({ ...pre, ...value, userId: session?.user?.id }));
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: theme?.colors?.red900?.value }}
    >
      <Grid.Container gap={2} justify="flex-end">
        <Grid xs={8} sm={4} md={4} justify="flex-end" alignItems="center">
          {/* <Button
            size="sm"
            shadow
            color="secondary"
            css={{ marginLeft: "20px" }}
            onClick={() => setIsFilterBlockVisible(!isFilterBlockVisible)}
          >
            Filter
          </Button> */}
          <Button
            shadow
            size="sm"
            color="secondary"
            css={{ marginLeft: "20px" }}
            onClick={() => setIsCreatePostModalVisible(true)}
          >
            Add
          </Button>
        </Grid>
      </Grid.Container>
      <div className={styles.wrapper__table__container}>
        {isFilterBlockVisible && (
          <div className={styles.wrapper__table__filter}>
            <Grid.Container gap={2} justify="center">
              <Grid xs={3} md={3}>
                <div>
                  <Text h6>Title</Text>
                  <Input
                    clearable
                    onChange={(e: any) =>
                      setFilters((pre: any) => ({
                        ...pre,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
              </Grid>
              <Grid xs={3} md={3}>
                <div>
                  <Text h6>Description</Text>
                  <Input
                    clearable
                    onChange={(e: any) =>
                      setFilters((pre: any) => ({
                        ...pre,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </Grid>
              <Grid xs={3} md={3}>
                <div>
                  <Text h6>Tags</Text>
                  <Input
                    clearable
                    onChange={(e: any) =>
                      setFilters((pre: any) => ({
                        ...pre,
                        tags: e.target.value,
                      }))
                    }
                  />
                </div>
              </Grid>
              <Grid xs={3} md={3}>
                <div>
                  <Text h6>Likes</Text>
                  <Input
                    clearable
                    onChange={(e: any) =>
                      setFilters((pre: any) => ({
                        ...pre,
                        likes: e.target.value,
                      }))
                    }
                  />
                </div>
              </Grid>
              <Grid xs={3} md={3}>
                <div>
                  <Text h6>Image Url</Text>
                  <Input
                    clearable
                    onChange={(e: any) =>
                      setFilters((pre: any) => ({
                        ...pre,
                        thumbnail: e.target.value,
                      }))
                    }
                  />
                </div>
              </Grid>
              <Grid xs={3} md={3}>
                <div>
                  <Text h6>Video Url</Text>
                  <Input
                    clearable
                    onChange={(e: any) =>
                      setFilters((pre: any) => ({
                        ...pre,
                        video_url: e.target.value,
                      }))
                    }
                  />
                </div>
              </Grid>
              <Grid xs={3} md={3}>
                <div>
                  <Text h6>Created At</Text>
                  <Input
                    clearable
                    type="date"
                    onChange={(e: any) =>
                      setFilters((pre: any) => ({
                        ...pre,
                        created_at: e.target.value,
                      }))
                    }
                  />
                </div>
              </Grid>
              <Grid xs={3} md={3}>
                <div>
                  <Text h6>Updated At</Text>
                  <Input
                    clearable
                    type="date"
                    onChange={(e: any) =>
                      setFilters((pre: any) => ({
                        ...pre,
                        updated_at: e.target.value,
                      }))
                    }
                  />
                </div>
              </Grid>
            </Grid.Container>

            <Button
              shadow
              size="xs"
              color="secondary"
              css={{ marginTop: "40px", marginRight: "10px" }}
            >
              Submit
            </Button>
          </div>
        )}

        <CustomTable
          shadow={true}
          color="secondary"
          css={{
            height: "auto",
            minWidth: "100%",
            padding: "0",
            borderRadius: 0,
          }}
          initialFilter={defaultFilter}
          total={tableTotal}
          onTableFilter={handleTableFilter}
          selectionMode="multiple"
          columns={tableColumn as any}
          data={tableData}
        />
      </div>

      {isCreatePostModalVisible && (
        <PostFormModal
          type={CrudType.CREATE}
          width="500px"
          visible={isCreatePostModalVisible}
          setVisible={setIsCreatePostModalVisible}
          onSubmit={handleSubmitCreateForm}
        />
      )}

      {isViewPostModalVisible && (
        <PostFormModal
          type={CrudType.VIEW}
          width="500px"
          initialData={initFormData}
          visible={isViewPostModalVisible}
          setVisible={setIsViewPostModalVisible}
        />
      )}
      {isEditPostModalVisible && (
        <PostFormModal
          type={CrudType.EDIT}
          width="500px"
          initialData={initFormData}
          visible={isEditPostModalVisible}
          setVisible={setIsEditPostModalVisible}
          onSubmit={handleSubmitEditForm}
        />
      )}

      {isDeletePostModalVisible && (
        <ConfirmModal
          visible={isDeletePostModalVisible}
          onClose={handleCloseDeleteForm}
          onSubmit={handleSubmitDeleteForm}
          title={`Delete Post`}
        >
          <Text css={{ display: "flex", justifyContent: "center" }}>
            Do you want to delete post: {initFormData.title}?
          </Text>
        </ConfirmModal>
      )}
    </div>
  );
}
