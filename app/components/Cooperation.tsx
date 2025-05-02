"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CooperationProps {
  messages: Record<string, string>;
}

export default function Cooperation({ messages }: CooperationProps) {
  const [logos, setLogos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const checkImageExists = (url: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = document.createElement('img');
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    };

    const detectLogos = async () => {
      const detectedLogos: string[] = [];
      for (let i = 1; i <= 3; i++) {
        const imgPath = `/cop${i}.jpg`;
        const exists = await checkImageExists(imgPath);
        if (exists) {
          detectedLogos.push(imgPath);
        }
      }
      setLogos(detectedLogos);
    };

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 768) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    detectLogos();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= logos.length - visibleItems ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? logos.length - visibleItems : prevIndex - 1
    );
  };

  if (logos.length === 0) return null;

  return (
    <section id="cooperation" className="w-full py-16 bg-gradient-to-b from-[#2a2725] to-dj-dark">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dj-gold mb-12">
          {messages.cooperation_header || "Our Partners"}
        </h2>
        
        <div className="relative group">
          <div className="relative overflow-hidden mx-auto max-w-[1000px]">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`
              }}
            >
              {logos.map((logo, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `calc((100% - ${(visibleItems - 1) * 1}rem) / ${visibleItems})` }}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-dj-purple/30 transition-all duration-300 h-full flex items-center justify-center max-w-[300px] mx-auto">
                    <div className="relative w-full h-40">
                      <Image
                        src={logo}
                        alt={`Partner ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {logos.length > visibleItems && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-dj-dark/80 hover:bg-dj-purple/80 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous partners"
              >
                &lt;
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-dj-dark/80 hover:bg-dj-purple/80 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next partners"
              >
                &gt;
              </button>
            </>
          )}

          {logos.length > visibleItems && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.max(1, logos.length - visibleItems + 1) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${currentIndex === i ? 'bg-dj-purple w-6' : 'bg-white/30'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}