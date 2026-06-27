import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import FloatingActionMenu from "../components/newlandingpage/FloatingActionMenu";
// import Footer from "./components/Footer";
// import Header from "./components/Header";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const aeonik = localFont({
  src: [
    {
      path: '../fonts/AeonikRegular.woff2', // Notice the double ../../
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Aeonik-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik',
  display: 'swap',
});

const teachers = localFont({
  src: [
    {
      path: '../fonts/Teachers-Regular.ttf', // Notice the double ../../
      weight: '100',
      style: 'normal',
    }
    // ,{
    //   path: '../fonts/Aeonik-Bold.otf',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  variable: '--font-teachers',
  display: 'swap',
});

const montserrat = localFont({
  src: [
    {
      path: '../fonts/montserrat-Regular.ttf', // Notice the double ../../
      weight: '100',
      style: 'normal',
    }
    // ,{
    //   path: '../fonts/Aeonik-Bold.otf',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  variable: '--font-teachers',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DUSACORE",
  description: "Unbowed, Unbent, Unbroken Services",
  
  // 1. Favicon and Apple Touch Icons
  icons: {
    icon: '/images/logo4.svg', // Place this file in your /public folder
    apple: '/images/logo4.svg', // Useful for iOS home screens
  },

  // 2. Open Graph (Used by Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: 'DUSACORE',
    description: 'Unbowed, Unbent, Unbroken Service',
    url: 'https://www.dusacore.io', // Replace with your actual domain
    siteName: 'DUSACORE',
    images: [
      {
        url: '/images/logo4.svg', // Place a 1200x630 image in your /public/images folder
        width: 1200,
        height: 630,
        alt: 'Dusacore Cover Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // 3. Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'DUSACORE',
    description: 'Unbowed, Unbent, Unbroken Services',
    images: ['/images/logo4.svg'], // You can usually reuse the Open Graph image here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${teachers.variable} ${aeonik.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Header /> */}
        {children}
        {/* <Footer/> */}
        <FloatingActionMenu />
      </body>
    </html>
  );
}
