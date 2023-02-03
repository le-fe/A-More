export function useAuthCookie() {
  const authTokenConf = {
    maxAge: 31556926, // 1 year
    secure: true,
  };
  const config = useRuntimeConfig();
  const authTokenKey = config.public._cookieKey.authToken;
  const authCookie = useCookie(authTokenKey, authTokenConf);
  return authCookie;
}
