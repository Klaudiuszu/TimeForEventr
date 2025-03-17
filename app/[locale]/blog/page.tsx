import { simpleBlogType } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { getMessages } from "next-intl/server";
import Navbar from "@/app/components/Navbar";

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
    <div className="max-w-2xl mx-auto xl:py-12">
      <Navbar locale={locale} messages={messages as Record<string, string>} />
      <h1 className="text-3xl font-bold text-center my-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((post, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.titleImage).url()}
              alt={post.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
              priority
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <Link
                href={`/${locale}/blog/${post.currentSlug}`}
                className="mt-4 inline-block text-primary hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}