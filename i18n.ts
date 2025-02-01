import { getRequestConfig } from "next-intl/server";

export const supportedLocales = ["en", "pl"];
export const defaultLocale = "pl";

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});