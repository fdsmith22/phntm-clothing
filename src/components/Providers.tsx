"use client";

import { ReactNode } from "react";
import TVStatic from "./TVStatic";
import SmoothScroll from "./SmoothScroll";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScroll>
      <TVStatic duration={1200} intensity="subtle" fadeOutDuration={600} />
      {children}
    </SmoothScroll>
  );
}
