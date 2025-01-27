import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';


export const client = createClient({
    apiVersion: '2023-05-03',
    dataset: 'production',
    projectId: 'lmormq1g',
    useCdn: false,
});

const builer = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builer.image(source);
}