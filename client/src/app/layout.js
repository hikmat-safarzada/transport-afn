import { Poppins } from "next/font/google";
import '@/app/globals.css';
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

export const metadata = {
  title: 'AFN Rent a Car',
  description: 'Premium və Ekonom klass avtomobillərin icarəsi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body className={poppins.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
