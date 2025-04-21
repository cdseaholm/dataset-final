import "./globals.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import { Inter } from "next/font/google";
import { MantineProvider } from '@mantine/core';
import PageWrapper from "@/components/templates/pageWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={inter.className}
      suppressHydrationWarning
    >
      <head></head>
      <body>
        <MantineProvider>
          <PageWrapper>{children}</PageWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
