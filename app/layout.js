import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { SessionProvider } from './context/SessionContext';
import { getUserSession } from "@/lib/actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mernstack Webapp",
  description: "mernstack webapp with login functionality",
};

export default async function RootLayout({ children }) {
  const session = await getUserSession();
  // console.log('session getting at layout',session);
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <SessionProvider initialSession={session}>
        <Navbar/>
        {children}
         </SessionProvider>
      </body>
    </html>
  );
}
