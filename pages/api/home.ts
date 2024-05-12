import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getHomePageData() {
  const { data: page }: AxiosResponse<HomeRes> = await axios.get(
    `${process.env.BACKEND_URL}/home-page`
  );
  return page;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HomeRes>
) {
  try {
    const page = await getHomePageData();
    res.status(200).json(page);
  } catch (err) {
    console.log("home page api err:", err);
  }
}
