import CookieBanner from "@/app/components/CookieBanner";
import Cookies from "@/app/components/Cookies";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import { getMessages } from "next-intl/server";

export async function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }];
}

export default async function CookiesPage({
  params,
}: {
  params: any | { locale: string };
}) {
  const { locale } = params;
  const messages = await getMessages({ locale });
  
  return (
    <section className="bg-[#070707] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar locale={locale} messages={messages as Record<string, string>} />
        <Cookies messages={messages as Record<string, string>} /> 
      </div>
      <Footer locale={locale} messages={messages as Record<string, string>} />
      <CookieBanner messages={messages as Record<string, string>} />
    </section>
  );
}