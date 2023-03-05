// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
  //if(req === ""){}
}


export async function getServerSideProps(context){

  // クエリパラメータの取得
  const keyword = context.query.keyword;
  const page = context.query.page;

  console.log("keyword =", keyword);
  console.log("page =", page);
  return { props: {} };
}