import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/Layout";
import twitter from "../../public/images/twitter.svg";
import { prisma } from "../../lib/prisma";
import { Post } from "@prisma/client";

type TProps = {
  post: Post;
};

export async function getStaticProps() {
  const post = await prisma.post.findFirst();
  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  };
}
export async function getStaticPaths() {
  const posts = await prisma.post.findMany();
  return {
    paths: posts.map((p) => {
      return {
        params: {
          id: p.id,
        },
      };
    }),
    fallback: false,
  };
}
export default function Posts({ post }: TProps) {
  const getTwitterURL = (): string => {
    const tweetText = `AIに「${post.target}」とデートするときのアドバイスをもらいました!🤖\n\nhttps://openai-dating.vercel.app/\n\n#AIDatingConsultant`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  };
  return (
    <>
      <Head>
        <title>AI Dating Consultant</title>
      </Head>
      <Layout>
        <Flex direction="column" align="center" mx="6">
          <Text>お相手は: 「{post.target}」</Text>
          <Textarea
            readOnly
            value={post.result}
            bg="#AA6373"
            color="foundation"
            resize="none"
            my="4"
            style={{ height: 300 }}
          />
          <a href={getTwitterURL()} target="_blank" rel="noreferrer">
            <Button bg="#1DA1F2" color="foundation">
              <Image src={twitter} alt="Twitter logo" width="24" height="24" />
              シェアする
            </Button>
          </a>
        </Flex>
      </Layout>
    </>
  );
}
