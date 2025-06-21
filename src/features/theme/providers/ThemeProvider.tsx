import { useState, useEffect } from "react";
import { getSystemTheme } from "@/features/theme/utils/getSystemTheme";
import { ThemeProviderContext } from "@/features/theme/contexts/ThemeProviderContext";
import type { Theme, ThemeProviderProps } from "@/features/theme/types";

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) ?? defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("theme", theme);
      setTheme(theme);
    },
  };

  return <ThemeProviderContext value={value}>{children}</ThemeProviderContext>;
}
