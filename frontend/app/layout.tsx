import type { Metadata } from "next";
import { Container } from "@chakra-ui/react";
import Provider from "@/components/providers";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Test",
  description: "Generated by your mother",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Container maxW="900px" mt={2}>
            <Navbar />
            {children}
          </Container>
        </Provider>
      </body>
    </html>
  );
}
