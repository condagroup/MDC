export const useRelativeUrl = (url) => {
  const config = useRuntimeConfig();
  return url.replace(config.public.baseUrl, '/');
};

export const useAbsoluteUrl = (url) => {
  const config = useRuntimeConfig();
  return `${config.public.baseUrl.slice(0, -1)}${url}`;
};

export const useCountryCode = () => 'IT';
