import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/Navbar";
import { getMessages } from "next-intl/server";
import '../globals.css';

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const messages = await getMessages({ locale });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar locale={locale} messages={messages as Record<string, string>} />
      <main className="max-w-2xl mx-auto px-4 py-4 xl:py-12">
        <h1 className="text-3xl font-bold text-center my-8">
          {t("welcome_message")}
        </h1>
        <p className="text-center">
          {t("description")}
        </p>
      </main>
    </ThemeProvider>
  );
}