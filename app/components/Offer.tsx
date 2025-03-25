"use client";

import Image from "next/image";

interface OfferProps {
  messages: Record<string, string>;
}

/**
 * Displays the DJ services offer section with optimized image loading
 * @component
 * @param {Object} props - Component props
 * @param {Record<string, string>} props.messages - Translation keys and values
 */
export default function Offer({ messages }: OfferProps) {
  const offers = [
    {
      img: "/offer1.jpg",
      title: messages.offer_1_title,
      text: messages.offer_1_text,
      priority: true
    },
    {
      img: "/offer2.jpg",
      title: messages.offer_2_title,
      text: messages.offer_2_text
    },
    {
      img: "/offer3.jpg",
      title: messages.offer_3_title,
      text: messages.offer_3_text
    },
    {
      img: "/offer4.jpg",
      title: messages.offer_4_title,
      text: messages.offer_4_text
    },
  ];

  return (
    <section id="offer" className="max-w-screen-xl w-full mx-auto p-6 md:p-12 bg-dj-light">
      <h1 className="text-3xl md:text-6xl font-bold text-center mb-8 text-dj-gold">
        {messages.offer}
      </h1>
      
      <div className="max-w-3xl mx-auto mb-12 text-center text-dj-dark/90">
        <p className="text-lg md:text-xl mb-4">
          {messages.offer_introduce}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="group relative p-6 md:p-4 rounded-2xl border border-dj-lightAccent bg-white shadow-lg hover:shadow-xl transition-all"
          >
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src={offer.img}
                alt={offer.title}
                fill
                priority={index < 2}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            </div>
            <h3 className="mt-6 text-2xl md:text-3xl font-semibold text-dj-dark">
              {offer.title}
            </h3>
            <p className="mt-3 text-lg text-dj-dark/80">{offer.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}