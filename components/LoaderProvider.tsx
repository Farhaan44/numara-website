"use client";

import { useEffect } from "react";
import NumaraLoader from "@/components/NumaraLoader";

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 5300);
    return () => { clearTimeout(timer); document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <NumaraLoader />
      {children}
    </>
  );
}