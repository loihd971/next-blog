import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Grid,
  Input,
  Modal,
  Row,
  styled,
  Text,
  Table,
  Textarea,
} from "@nextui-org/react";
import Select from "react-select";
import UploadFile from "./UploadFile";
import { useSession } from "next-auth/react";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import { Upload as AwsUpload } from "@aws-sdk/lib-storage";
import { CrudType, PostType } from "@/utils/sharedType";
import CustomRichEditor from "./CustomRichEditor";

type Props = {
  visible: boolean;
  setVisible: (value: any) => void;
  onSubmit?: (e: any) => void;
  initialData?: PostType | any;
  width: string;
  type?: CrudType;
};

function PostFormModal({
  visible,
  setVisible,
  onSubmit,
  initialData,
  type,
  ...rest
}: Props) {
  const { data: session }: any = useSession();

  const [formData, setFormData] = useState<any>({});
  const [title, setTitle] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [tags, setTags] = useState<any>(null);
  const [likes, setLikes] = useState<any>(null);
  const [img, setImg] = useState<any>(undefined);
  const [video, setVideo] = useState<any>(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [isEdit, setIsEdit] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleCloseCreatePostModal = () => {
    resetForm();
    setImgPerc(0);
    setVideoPerc(0);
    setVisible(false);
  };

  useEffect(() => {
    if (type === CrudType.VIEW || type === CrudType.EDIT) {
      const { title, description, tags, likes, videoUrl, thumbnail } =
        initialData;

      setTitle(title);
      setDescription(description);
      setTags(tags);
      setLikes(likes);
      setVideo(videoUrl);
      setImg(thumbnail);
    }
  }, [type]);

  const titleError = useMemo(() => {
    if (!title && (isEdit.includes("title") || isSubmit)) {
      return <Text color="error">{`Title is required`}</Text>;
    } else {
      return null;
    }
  }, [title, isSubmit]);

  const descriptionError = useMemo(() => {
    if (!description && (isEdit.includes("description") || isSubmit)) {
      return <Text color="error">{`Description is required`}</Text>;
    } else {
      return null;
    }
  }, [description, isSubmit]);

  const contentError = useMemo(() => {
    if (!content && (isEdit.includes("content") || isSubmit)) {
      return <Text color="error">{`Content is required`}</Text>;
    } else {
      return null;
    }
  }, [content, isSubmit]);

  const tagsError = useMemo(() => {
    if (!tags && (isEdit.includes("tags") || isSubmit)) {
      return <Text color="error">{`Tags is required`}</Text>;
    } else {
      return null;
    }
  }, [tags, isSubmit]);

  const videoError = useMemo(() => {
    if (
      videoPerc === 0 &&
      (isEdit.includes("video") || isSubmit) &&
      type !== CrudType.EDIT
    ) {
      return <Text color="error">{`Video is required`}</Text>;
    } else {
      return null;
    }
  }, [videoPerc, isSubmit]);

  const imageError = useMemo(() => {
    if (type !== CrudType.EDIT) {
      if (imgPerc === 0 && (isEdit.includes("image") || isSubmit)) {
        return <Text color="error">{`Image is required`}</Text>;
      } else {
        return null;
      }
    }
  }, [type, imgPerc, isSubmit]);

  const uploadFile = async (file: any, urlType: string) => {
    try {
      const auth = {
        accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      };

      const parallelUploads3 = new AwsUpload({
        client:
          new S3({
            region: "us-west-1",
            credentials: auth,
          }) ||
          new S3Client({
            region: "us-west-1",
            credentials: auth,
          }),
        params: {
          Bucket: "nextauth",
          Key: file.name,
          Body: file,
          ContentType: file.type,
        },
        tags: [
          /*...*/
        ], // optional tags
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });

      parallelUploads3.on("httpUploadProgress", (progress: any) => {
        if (urlType === "videoUrl") {
          setVideoPerc((progress.loaded / progress.total) * 100);
          setIsEdit((pre: any) => [...pre, "video"]);
        } else if (urlType === "imgUrl") {
          setIsEdit((pre: any) => [...pre, "image"]);
          setImgPerc((progress.loaded / progress.total) * 100);
        }
      });

      const data: any = await parallelUploads3.done();
      setFormData((prev: any) => {
        return { ...prev, [urlType]: data.Location };
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const resetForm = () => {
    setTitle(null);
    setDescription(null);
    setTags(null);
    setLikes(null);
    setImg(null);
    setVideo(null);
  };

  return (
    <Modal
      {...rest}
      closeButton
      blur
      open={visible}
      onClose={handleCloseCreatePostModal}
    >
      <Modal.Header>
        <Text h6>
          <b>
            {type === CrudType.CREATE
              ? "Create"
              : type === CrudType.EDIT
              ? "Edit"
              : "View"}{" "}
            Post
          </b>
        </Text>
      </Modal.Header>
      <Modal.Body
        css={{
          maxHeight: "500px",
          scrollbarWidth: "5px !important",
          overflowX: "hidden",
        }}
      >
        <div>
          <Text h6>Title</Text>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            value={title}
            placeholder="Title"
            disabled={type === CrudType.VIEW}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsEdit((pre: any) => [...pre, "title"]);
            }}
          />

          {titleError}
        </div>
        <div>
          <Text h6>Description</Text>
          <Textarea
            bordered
            fullWidth
            color="primary"
            size="lg"
            disabled={type === CrudType.VIEW}
            value={description}
            placeholder="Desciption"
            onChange={(e) => {
              setDescription(e.target.value);
              setIsEdit((pre: any) => [...pre, "description"]);
            }}
          />

          {descriptionError}
        </div>
        <div>
          <Text h6>Content</Text>
          <CustomRichEditor
            value={description}
            onChange={(e: any) => {
              setContent(e);
              setIsEdit((pre: any) => [...pre, "description"]);
            }}
          />
          {contentError}
        </div>
        <div>
          <Text h6>Tags</Text>
          <Input
            clearable
            bordered
            fullWidth
            value={tags}
            color="primary"
            disabled={type == CrudType.VIEW}
            size="lg"
            placeholder="Tags"
            onChange={(e) => {
              setTags(e.target.value);
              setIsEdit((pre: any) => [...pre, "tags"]);
            }}
          />
          {tagsError}
        </div>
        <div>
          <Text h6>Likes</Text>
          <Input
            clearable
            value={likes}
            bordered
            fullWidth
            disabled={type !== CrudType.EDIT}
            color="primary"
            size="lg"
            placeholder="likes"
          />
        </div>
        <div>
          <Text h6>Upload Video</Text>

          {type !== CrudType.CREATE ? (
            <span> {video}</span>
          ) : (
            <UploadFile
              key="video"
              type="video"
              accept="video/*"
              videoPerc={videoPerc}
              setFile={setVideo}
            />
          )}
          {videoError}
        </div>
        <div>
          <Text h6>Upload Thumbnail</Text>
          {type !== CrudType.CREATE ? (
            <span>{img}</span>
          ) : (
            <UploadFile
              key="image"
              type="image"
              accept="image/*"
              imgPerc={imgPerc}
              setFile={setImg}
            />
          )}

          {imageError}
        </div>

        <Row justify="space-between"></Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={handleCloseCreatePostModal}>
          Cancel
        </Button>
        <Button
          // disabled={
          //   titleError !== null ||
          //   descriptionError !== null ||
          //   contentError !== null ||
          //   tagsError !== null ||
          //   (videoPerc !== 100 && type !== CrudType.EDIT) ||
          //   (imgPerc !== 100 && type !== CrudType.EDIT)
          // }
          auto
          onClick={() => {
            onSubmit &&
              onSubmit({
                ...formData,
                thumbnail: formData.imgUrl,
                title,
                description,
                content,
                tags,
                likes,
              });
            setIsSubmit(true);
          }}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostFormModal;
