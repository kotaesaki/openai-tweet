import { Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/Layout";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const handleTextareaChange = (e: any) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error || new Error(`リクエストに失敗しました。 ステータスコード: ${response.status}`)
        );
      }
      router.push(`/post/${data.id}`);
    } catch (e: any) {
      console.error(e);
      toast({
        title: "リクエストに失敗しました。時間を置いて再度お願いします。",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Dating Consultant</title>
      </Head>
      <main>
        <Layout>
          <Box mx="6" textAlign="center">
            <Text mb="16px" as="b">
              誰と行くか記入しましょう！
            </Text>
            <Textarea
              value={text}
              onChange={handleTextareaChange}
              placeholder={`例）小学生の時好きだった隣の席の男の子、マッチングアプリで会った３４歳の女性、橋本環奈`}
              bg="white"
              resize="none"
              style={{ height: 200 }}
            />
          </Box>
          <Flex direction="column" align="center">
            <Button
              bg="primary"
              color="foundation"
              size="lg"
              onClick={onSubmit}
              isLoading={isLoading}
              disabled={!text || isLoading}
            >
              アドバイスをもらう
            </Button>
          </Flex>
        </Layout>
      </main>
    </>
  );
}
