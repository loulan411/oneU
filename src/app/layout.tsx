import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from "@/components/Header";
import { Web3Provider } from './providers';
import "./globals.css";
import { ConfigProvider, theme } from 'antd';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneU",
  description: "Cryptocurrency lottery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        <Web3Provider>
          <Header />
          <AntdRegistry>
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm, // 可选：暗色用 theme.darkAlgorithm
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </Web3Provider>
      </body>
    </html>
  );
}
