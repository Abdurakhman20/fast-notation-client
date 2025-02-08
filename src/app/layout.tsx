import { MainProvider } from "@/shared/providers";
import { ToggleTheme } from "@/shared/components/ui";

import "@/shared/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MainProvider>
          <div className="relative flex min-h-screen flex-col">
            <ToggleTheme />
            <div className="flex h-screen w-full items-center justify-center px-4">{children}</div>
          </div>
        </MainProvider>
      </body>
    </html>
  );
}
