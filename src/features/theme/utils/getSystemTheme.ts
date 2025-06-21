export function getSystemTheme() {
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDarkTheme ? "dark" : "light";
}
