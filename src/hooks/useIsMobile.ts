// hooks/useIsMobile.ts
import { useEffect, useState } from "react";

export function useIsMobile(maxWidth = 768): boolean {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return isMobile;
}
