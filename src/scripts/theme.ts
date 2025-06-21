import { getSystemTheme } from "@/features/theme/utils/getSystemTheme";

const root = document.documentElement;
const theme = localStorage.getItem("theme") ?? "system";

if (theme === "system") {
  const systemTheme = getSystemTheme();
  root.classList.add(systemTheme);
} else {
  root.classList.add(theme);
}
