export const initializeTheme = () => {
  const savedTheme = getSavedTheme();
  const preferScheme = getPreferScheme();
  if (
    (savedTheme && savedTheme === "dark") ||
    (!savedTheme && preferScheme === "dark")
  ) {
    document.documentElement.classList.add("dark");
  }
};

export const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

export const getSavedTheme = () => {
  return localStorage.getItem("theme") ?? undefined;
};

export const getPreferScheme = () => {
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  }
  return "light";
};

export const isCurrentThemeDark = () => {
  return document.documentElement.classList.contains("dark");
};
