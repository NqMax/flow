import { ThemeProviderContext } from "@/features/theme/contexts/ThemeProviderContext";
import { useContext } from "react";

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
