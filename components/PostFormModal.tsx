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
  theme,
} from "@nextui-org/react";
import Select from "react-select";
import UploadFile from "./UploadFile";
import { useSession } from "next-auth/react";
// import { S3Client, S3 } from "@aws-sdk/client-s3";
// import { Upload as AwsUpload } from "@aws-sdk/lib-storage";
import { CrudType, PostType } from "@/utils/sharedType";
import CustomRichEditor from "./CustomRichEditor";
import app from "@/services/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import makeAnimated from "react-select/animated";

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
  const animatedComponents = makeAnimated();
  const { data: session }: any = useSession();
  const [formData, setFormData] = useState<any>({});
  const [title, setTitle] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [tags, setTags] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
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
      const { title, description, tags, likes, videoUrl, thumbnail, content } =
        initialData;

      setTitle(title);
      setDescription(description);
      setTags(
        tags.map((item: any) => ({ value: item, label: item.replace("#", "") }))
      );
      setLikes(likes || []);
      setContent(content);
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
    if (tags.length <= 0 && (isEdit.includes("tags") || isSubmit)) {
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

  const handleUploadFile = (file: any, urlType: any) => {
    console.log("rin ");

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));

        urlType === "imgUrl"
          ? setIsEdit((pre: any) => [...pre, "image"])
          : setIsEdit((pre: any) => [...pre, "video"]);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev: any) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  // const uploadFile = async (file: any, urlType: string) => {
  //   try {
  //     const auth = {
  //       accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
  //       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  //     };

  //     const parallelUploads3 = new AwsUpload({
  //       client:
  //         new S3({
  //           region: "us-west-1",
  //           credentials: auth,
  //         }) ||
  //         new S3Client({
  //           region: "us-west-1",
  //           credentials: auth,
  //         }),
  //       params: {
  //         Bucket: "nextauth",
  //         Key: file.name,
  //         Body: file,
  //         ContentType: file.type,
  //       },
  //       tags: [
  //         /*...*/
  //       ], // optional tags
  //       queueSize: 4, // optional concurrency configuration
  //       partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
  //       leavePartsOnError: false, // optional manually handle dropped parts
  //     });

  //     parallelUploads3.on("httpUploadProgress", (progress: any) => {
  //       if (urlType === "videoUrl") {
  //         setVideoPerc((progress.loaded / progress.total) * 100);
  //         setIsEdit((pre: any) => [...pre, "video"]);
  //       } else if (urlType === "imgUrl") {
  //         setIsEdit((pre: any) => [...pre, "image"]);
  //         setImgPerc((progress.loaded / progress.total) * 100);
  //       }
  //     });

  //     const data: any = await parallelUploads3.done();
  //     setFormData((prev: any) => {
  //       return { ...prev, [urlType]: data.Location };
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    type === CrudType.CREATE && video && handleUploadFile(video, "videoUrl");
  }, [video, type]);

  useEffect(() => {
    type === CrudType.CREATE && img && handleUploadFile(img, "imgUrl");
  }, [img, type]);
  console.log(contentError, content, description, descriptionError);

  const resetForm = () => {
    setTitle(null);
    setDescription(null);
    setTags([]);
    setContent(null);
    setLikes([]);
    setImg(null);
    setVideo(null);
  };

  const options = [
    { value: "#Frontend", label: "Frontend" },
    { value: "#Backend", label: "Backend" },
    { value: "#Devops", label: "Devops" },
    { value: "#Tools", label: "Tools" },
    { value: "#Library", label: "Library" },
    { value: "#Trending", label: "Trending" },
    { value: "#Mobile", label: "Mobile" },
    { value: "#IOT", label: "IOT" },
    { value: "#Game", label: "Game" },
    { value: "#UI/UX", label: "UI/UX" },
    { value: "#Funny", label: "Funny" },
  ];

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
            disabled={type === CrudType.VIEW}
            currentValue={content}
            onChange={(e: any) => {
              console.log(e);
              setContent(e === "<p><br></p>" ? null : e);

              setIsEdit((pre: any) => [...pre, "content"]);
            }}
          />
          {contentError}
        </div>
        <div>
          <Text h6>Tags</Text>
          <Select
            isDisabled={type === CrudType.VIEW}
            styles={{
              option: (provided, state) => ({
                ...provided,
                background: theme.colors.accents3.value,
              }),
              control: (provided, state) => ({
                ...provided,
                background: theme.colors.accents0.value,
              }),
            }}
            closeMenuOnSelect={false}
            components={animatedComponents}
            onChange={(e) => {
              setTags(e);
              setIsEdit((pre: any) => [...pre, "tags"]);
            }}
            value={tags}
            isMulti
            options={options}
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
          disabled={
            titleError !== null ||
            descriptionError !== null ||
            contentError !== null ||
            tagsError !== null ||
            (videoPerc !== 100 && type !== CrudType.EDIT) ||
            (imgPerc !== 100 && type !== CrudType.EDIT)
          }
          auto
          onClick={() => {
            onSubmit &&
              onSubmit({
                ...formData,
                thumbnail: formData.imgUrl,
                title,
                description,
                content,
                tags: tags.map((item: any) => item.value),
                likes,
                userId: session?.user?.id,
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
