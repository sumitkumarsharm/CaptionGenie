import { useEffect, useState } from "react";

export default function useDarkMode() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("dark");
    if (stored !== null) return stored === "true";
    return prefersDark;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("dark", dark);
  }, [dark]);

  return [dark, setDark];
}
