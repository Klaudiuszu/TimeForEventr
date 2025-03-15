import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const supportedLocales = ["en", "pl"];
export const defaultLocale = "pl";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  const messages = (await import(`./locales/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});