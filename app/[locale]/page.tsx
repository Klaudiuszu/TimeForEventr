import Navbar from "../components/navbar/Navbar";
import { getMessages } from "next-intl/server";
import '../globals.css';
import VideoBackground from "../components/VideoBackground";
import DJSection from "../components/DJSection";
import Offer from "../components/Offer";
import SoundSection from "../components/SoundsSection";
import Footer from "../components/Footer";
import Cooperation from "../components/Cooperation";
import EmailSection from "../components/Email";
import CookieBanner from "../components/CookieBanner";

export async function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }];
}

export default async function Home({ params }: { params: any | { locale: string } }) {
  const { locale } = params;
  const messages = await getMessages({ locale });

  return (
    <div className="w-full overflow-hidden">
      <Navbar locale={locale} messages={messages as Record<string, string>} />
      <VideoBackground messages={messages as Record<string, string>} />
      <div className="w-full">
        <DJSection messages={messages as Record<string, string>} />
        <Offer messages={messages as Record<string, string>} />
        <SoundSection messages={messages as Record<string, string>} />
        <Cooperation messages={messages as Record<string, string>} />
        <EmailSection messages={messages as Record<string, string>} />
        <Footer locale={locale} messages={messages as Record<string, string>} />
      </div>
      <CookieBanner messages={messages as Record<string, string>} />
    </div>
  );
}