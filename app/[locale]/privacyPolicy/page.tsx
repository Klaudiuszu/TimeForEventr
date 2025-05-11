
import CookieBanner from "@/app/components/CookieBanner";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import PrivacyPolicy from "@/app/components/PrivacyPolicy";
import { getMessages } from "next-intl/server";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: any | { locale: string };
}) {
  const { locale } = params;
  const messages = await getMessages({ locale });
  console.log({locale})
  return (
    <section className="bg-[#070707] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar locale={locale} messages={messages as Record<string, string>} />
        <PrivacyPolicy messages={messages as Record<string,string>} /> 
      </div>
        <Footer locale={locale} messages={messages as Record<string, string>} />
        <CookieBanner messages={messages as Record<string,string>} />
    </section>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }];
}