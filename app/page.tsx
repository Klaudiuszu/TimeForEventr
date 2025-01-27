import { client } from "./lib/sanity";

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current
}`

const data = await client.fetch(query);
return data;
}

export default async function Home() {
  const data = await getData();
  
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-5">
    </div>
  );
}