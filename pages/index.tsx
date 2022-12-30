import { Box, Button, Flex, Heading, Text, Textarea, useToast } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import twitter from "../public/images/twitter.svg";
import logo from "../public/images/logo.png";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

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
      setResult(data.result);
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

  const getTwitterURL = (): string => {
    const tweetText = `AIに「${text}」とデートするときのアドバイスをもらいました!🤖\n\nhttps://openai-dating.vercel.app/\n\n#AIDatingConsultant`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  };

  return (
    <>
      <Head>
        <title>AI Dating Consultant</title>
        <meta name="description" content="デートの話題が見つからない！" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main>
        <Box w="100vw" bg="foundation" color="black">
          <Flex
            direction="column"
            justifyContent="space-between"
            minH="100vh"
            maxW="600px"
            m="auto"
          >
            <Flex direction="column" justifyContent="space-between" w="100%" p={4} align="center">
              <Image src={logo} alt="logo" width={60} />
              <Heading as="h1" size="lg">
                AI Dating Consultant
              </Heading>
              <Heading as="h2" size="xs">
                デートの話題をAIからアドバイスをもらえる
              </Heading>
            </Flex>
            {result && (
              <Flex direction="column" align="center" mx="6">
                <a href={getTwitterURL()} target="_blank" rel="noreferrer">
                  <Button bg="#1DA1F2" color="foundation">
                    <Image src={twitter} alt="Twitter logo" width="24" height="24" />
                    シェアする
                  </Button>
                </a>
                <Textarea
                  readOnly
                  value={result}
                  bg="#AA6373"
                  color="foundation"
                  resize="none"
                  mt="4"
                  style={{ height: 300 }}
                />
              </Flex>
            )}
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
            <Flex direction="column" justify="space-between" p={4} align="center">
              ©︎ 2022 AI Dating Consultant powered by OpenAI
            </Flex>
          </Flex>
        </Box>
      </main>
    </>
  );
}
