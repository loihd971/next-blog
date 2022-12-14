import axios from "axios";

export async function loadPosts() {
  try {
    const res: any = await axios.get(`https://evanloi971.vercel.app/api/post`);
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const get = (url: string) => axios.get(url).then((res: any) => res.data);
