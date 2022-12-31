import { Box, Flex, Heading } from "@chakra-ui/react";
import logo from "../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  readonly children: React.ReactNode;
};
export const Layout = ({ children }: TProps) => {
  return (
    <Box w="100vw" bg="foundation" color="black">
      <Flex direction="column" justifyContent="space-between" minH="100vh" maxW="600px" m="auto">
        <Link href="/">
          <Flex direction="column" justifyContent="space-between" w="100%" p={4} align="center">
            <Image src={logo} alt="logo" width={60} />
            <Heading as="h1" size="lg">
              AI Dating Consultant
            </Heading>
            <Heading as="h2" size="xs">
              デートの話題をAIからアドバイスをもらえる
            </Heading>
          </Flex>
        </Link>
        {children}
        <Flex direction="column" fontSize="sm" justify="space-between" p={4} align="center">
          ©︎ 2022 AI Dating Consultant powered by OpenAI
        </Flex>
      </Flex>
    </Box>
  );
};
