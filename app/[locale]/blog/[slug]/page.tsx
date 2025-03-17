import { fullBlogType } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getMessages } from "next-intl/server";
import Navbar from "@/app/components/Navbar";

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
  return await {
    ...data,
    title: data.title[locale],
    content: data.content[locale],
  };
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { slug, locale } = await params;
  const data: fullBlogType = await getData(slug, locale);
  const messages = await getMessages({ locale });

  return (
    <div className="max-w-2xl mx-auto xl:py-12">
      <Navbar locale={locale} messages={messages as Record<string, string>} />

      <div className="mt-8">
        <h1>
          <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Time For Events - BLOG
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data.title}
          </span>
        </h1>

        <Image
          src={urlFor(data.titleImage).url()}
          width={800}
          height={800}
          alt="Title Image"
          priority
          className="rounded-lg mt-8 border"
        />

        <div className="mt-16 prose prose-blue prose-lg prose-li:marker:text-primary prose-a:text-primary">
          <PortableText value={data.content} />
        </div>
      </div>
    </div>
  );
}