"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { CartProvider } from "@/contexts/cart-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cartridge-ui-theme">
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CartProvider>{children}</CartProvider>
      </SessionProvider>
    </QueryClientProvider>
    </ThemeProvider>
  );
}
