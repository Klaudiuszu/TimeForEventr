import { fullBlogType } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getMessages } from "next-intl/server";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/Footer";

export const revalidate = 30;

async function getData(slug: string, locale: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;

  const data = await client.fetch(query);
  return {
    ...data,
    title: data.title[locale],
    content: data.content[locale],
  };
}

export default async function BlogArticle({
  params,
}: {
  params: any | { slug: string; locale: string };
}) {
  const { slug, locale } = params;
  const data: fullBlogType = await getData(slug, locale);
  const messages = await getMessages({ locale });

  return (
    <section className="w-screen bg-[#070707]">
      <div className="max-w-2xl mx-auto md:py-20 py-16 min-h-screen">
        <Navbar locale={locale} messages={messages as Record<string, string>} />
        <div className="mt-8 px-4">
          <h1>
            <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl text-white">
              {data.title}
            </span>
          </h1>
          <Image
            src={urlFor(data.titleImage).url()}
            width={800}
            height={800}
            alt="Title Image"
            priority
            className="rounded-lg mt-8 border border-gray-700 shadow-lg"
          />
          <div className="mt-16 prose prose-lg dark:prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-purple-400 prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-li:text-gray-300 prose-li:marker:text-purple-400 prose-blockquote:text-gray-400 prose-code:text-gray-300 prose-pre:bg-gray-800 max-w-none">
            <PortableText value={data.content} />
          </div>
        </div>
      </div>
      <Footer locale={locale} messages={messages as Record<string, string>} />
    </section>
  );
}

export async function generateStaticParams() {

  const query = `*[_type == "blog"] { "slug": slug.current }`;
  const posts: { slug: string }[] = await client.fetch(query);

  return posts.flatMap((post: { slug: string }) => [
    { locale: 'pl', slug: post.slug },
    { locale: 'en', slug: post.slug }
  ]);
}