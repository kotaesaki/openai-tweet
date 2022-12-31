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

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const post = await prisma.post.findUnique({
    where: { id },
  });
  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
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
        <meta property="og:title" content="AI Dating Consultant" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://openai-dating.vercel.app/post/${post.id}`} />
        <meta
          property="og:image"
          content={`https://openai-dating.vercel.app/api/og?title=「${post.target}」とデートする時のアドバイスをください`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="AI Dating Consultant" />
        <meta property="og:description" content="AIがデートのアドバイスをくれます" />
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
