import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/Navbar";
import '../globals.css';

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale });


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
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