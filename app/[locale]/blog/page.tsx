import { simpleBlogType } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { getMessages } from "next-intl/server";
import Navbar from "@/app/components/navbar/Navbar";
import Button from "@/app/components/Button";
import clsx from "clsx";
import Footer from "@/app/components/Footer";
import CookieBanner from "@/app/components/CookieBanner";

export const revalidate = 30;

async function getData(locale: string) {
  const query = `
    *[_type == "blog"] | order(_createdAt desc) {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
    }`;

  const data = await client.fetch(query);
  return data.map((post: any) => ({
    ...post,
    title: post.title[locale],
    smallDescription: post.smallDescription[locale],
  }));
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const data: simpleBlogType[] = await getData(locale);
  const messages = await getMessages({ locale });

  return (
    <section className="bg-[#070707] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar locale={locale} messages={messages as Record<string, string>} />

        <div className="pt-24 md:pt-28 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover the latest articles and news
            </p>
          </div>

          {data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No articles yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((post) => (
                <article
                  key={post.currentSlug}
                  className={clsx(
                    "rounded-xl overflow-hidden h-full flex flex-col",
                    "bg-white/5 backdrop-blur-sm border border-white/10",
                    "transition-all duration-300"
                  )}
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={urlFor(post.titleImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 mb-4 text-sm line-clamp-3 flex-1">
                      {post.smallDescription}
                    </p>

                    <Button
                      href={`/${locale}/blog/${post.currentSlug}`}
                      className="mt-auto text-white font-bold rounded-sm"
                    >
                      Read More
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer locale={locale} messages={messages as Record<string, string>} />
      <CookieBanner messages={messages as Record<string,string>} />
    </section>
  );
}