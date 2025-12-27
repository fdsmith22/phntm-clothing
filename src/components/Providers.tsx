"use client";

import { ReactNode } from "react";
import TVStatic from "./TVStatic";
import SmoothScroll from "./SmoothScroll";
import CartDrawer from "./CartDrawer";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "./Toast";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <ToastProvider>
          <SmoothScroll>
            <TVStatic duration={1200} intensity="subtle" fadeOutDuration={600} />
            {children}
            <CartDrawer />
          </SmoothScroll>
        </ToastProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
