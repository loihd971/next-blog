import axios from "axios";

export async function loadPosts() {
  try {
    const res: any = await axios.get(`${process.env.BASE_URL}/api/post`);
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const get = (url: string) => axios.get(url).then((res: any) => res.data);
