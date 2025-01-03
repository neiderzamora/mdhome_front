import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/context/UserContext"; // Importa el UserProvider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MDHome",
  description: "MDHome",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider> {/* Envuelve el contenido con UserProvider */}
          {children}
        </UserProvider>
      </body>
    </html>
  );
}