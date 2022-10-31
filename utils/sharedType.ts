export type Session = {
  user: {
    image?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
  };
};

export enum Post {
  title = "title",
  description = "description",
  thumbnail = "thumbnail",
  videoUrl = "videoUrl",
  tags = "tags",
  likes = "likes",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}

export type PostType = {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  tags: string;
  likes: string;
  createdAt: string;
  updatedAt: string;
};

export enum PostEnum {
  title = "title",
  description = "description",
  thumbnail = "thumbnail",
  videoUrl = "videoUrl",
  tags = "tags",
  likes = "likes",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  action = "action"
}

export enum Language {
  en = "en",
  vi = "vi",
}

export enum CrudType {
  CREATE = "CREATE",
  VIEW = "VIEW",
  EDIT = "EDIT",
  DELETE = "DELETE",
}
