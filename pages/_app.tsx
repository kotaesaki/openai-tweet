import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Roboto } from "@next/font/google";

const colors = {
  primary: "#467599",
  secondary: "#F07167",
  foundation: "#F4F7F5",
  black: "#08090A",
};

const theme = extendTheme({ colors });

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </main>
  );
}
