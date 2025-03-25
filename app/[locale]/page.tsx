import { getTranslations } from "next-intl/server";
import Navbar from "../components/Navbar";
import { getMessages } from "next-intl/server";
import '../globals.css';
import VideoBackground from "../components/VideoBackground";
import DJSection from "../components/DJSection";
import Offer from "../components/Offer";

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const messages = await getMessages({ locale });

  return (
    <div className="w-full overflow-hidden">
      <Navbar locale={locale} messages={messages as Record<string, string>} />
      <VideoBackground messages={messages as Record<string, string>} />
      <div className="w-full">
        <div className="bg-dj-dark">
          <DJSection messages={messages as Record<string, string>} />
        </div>
        <div className="bg-dj-light">
          <Offer messages={messages as Record<string, string>} />
        </div>
      </div>
    </div>
  );
}