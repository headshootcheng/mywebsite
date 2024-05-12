import axios, { AxiosResponse } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HomeRes>
) {
  try {
    const { data: page }: AxiosResponse<HomeRes> = await axios.get(
      `${process.env.BACKEND_URL}/home-page`
    );
    res.status(200).json(page);
  } catch (err) {
    console.log("home page api err:", err);
  }
}
