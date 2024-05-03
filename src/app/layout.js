import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "eggChain",
  description: "Decentralized solution for egg supply chain",
};

import { TrackingProvider } from "../../context/TrackingContext";
import {NavBar, Footer} from "./_components";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <TrackingProvider>
          <NavBar />
          <main>{children}</main>
        </TrackingProvider>
        <Footer />
      </body>
    </html>
  );
}
