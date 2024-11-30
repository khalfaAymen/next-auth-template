import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css"
import { Navbar } from "@/components/navbar";
import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          
          
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
            <Layout>
            {children}
            <Toaster />
            </Layout>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

