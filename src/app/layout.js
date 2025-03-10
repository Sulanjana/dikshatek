import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import WrapperRedux from "./component/WrapperRedux";
import SessionProvider from "./component/SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
        <WrapperRedux>
          <SessionProvider session={session}>
            <Header />
            {children}
          </SessionProvider>
        </WrapperRedux>
      </body>
    </html>
  );
}
