"use client";

import { ThemeProvider } from "./ThemeProvider";

type MainProviderProps = {
  children: React.ReactNode;
};

export function MainProvider({ children }: MainProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange storageKey="theme">
      {children}
    </ThemeProvider>
  );
}
