import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./MyContext";


const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"], // required weights
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "REST Countries",
  description: "Frontend Mentor Challenge",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
    className={`${nunito.variable} antialiased`}>
        {" "}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
