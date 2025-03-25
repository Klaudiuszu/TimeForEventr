import { getTranslations } from "next-intl/server";
import Navbar from "../components/Navbar";
import { getMessages } from "next-intl/server";
import '../globals.css';
import VideoBackground from "../components/VideoBackground";

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const messages = await getMessages({ locale });

  return (
    <>
      <Navbar locale={locale} messages={messages as Record<string, string>} />
      <VideoBackground messages={messages as Record<string, string>} />
    </>
  );
}