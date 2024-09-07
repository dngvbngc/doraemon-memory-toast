import NavBar from "@/components/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory Toast",
  description: "Doraemon Memory Toast here to assist your studies!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ChakraProvider>
          <NavBar />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
