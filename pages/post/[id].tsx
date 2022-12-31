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

export async function getStaticProps(context: any) {
  const { id } = context.params;
  const post = await prisma.post.findUnique({
    where: { id },
  });
  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
    revalidate: 10,
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export default function Posts({ post }: TProps) {
  const getTwitterURL = (): string => {
    const postText: string = post.result.substr(0, 80) + "...";
    const tweetText = `${postText}\n\nhttps://openai-dating.vercel.app/post/${post.id}\n\n#AIDatingConsultant\n#OpenAI`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  };
  return (
    <>
      <Head>
        <title>AI Dating Consultant</title>
        <meta
          name="description"
          content={`https://my-og-img.vercel.app/api/og?title=「${post.target}」とデートする時のアドバイスをください`}
        />
      </Head>
      <Layout>
        <Flex direction="column" align="center" mx="6">
          <Text as="b">お相手は: 「{post.target}」</Text>
          <Textarea
            readOnly
            value={post.result}
            bg="#AA6373"
            color="foundation"
            resize="none"
            my="4"
            style={{ height: 400 }}
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
