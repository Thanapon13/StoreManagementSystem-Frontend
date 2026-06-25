const ACCESS_TOKEN = "ACCESS_TOKEN";
const THEME = "THEME";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const setAccessToken = (accessToken: string) =>
  localStorage.setItem(ACCESS_TOKEN, accessToken);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const getTheme = () => localStorage.getItem(THEME);

export const setTheme = (theme: string) => localStorage.setItem(THEME, theme);
