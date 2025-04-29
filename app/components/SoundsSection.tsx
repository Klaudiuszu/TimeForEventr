import Image from 'next/image';

interface SoundSectionProps {
    messages: Record<string, string>;
}

/**
 * SoundSection Component - Displays a professional sound equipment section with image and translations
 * @param {Object} props - The component props
 * @param {Record<string, string>} props.messages - Translation messages object 
 * @returns {JSX.Element} A responsive section featuring:
 *   - A heading with gold-colored title
 *   - Descriptive text
 *   - Gradient separator line
 *   - Image of professional sound equipment
 *   - All styled with a black background
 */
export default function SoundSection({ messages }: SoundSectionProps) {
    return (
      <section id='sound' className="w-full bg-dj-dark py-12 md:py-24">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between p-6 md:p-12 gap-8">
      <div className="flex-1 flex justify-center">
          <div className="relative w-full aspect-[4/3] max-w-[600px]">
            <Image 
              src="/systemPhoto.jpg" 
              alt="Professional sound equipment"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-xl shadow-2xl border-2 border-white/20 hover:border-dj-purple/50 transition-colors duration-300"
              priority
            />
          </div>
        </div>
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-6xl text-dj-gold font-bold drop-shadow-lg">
            {messages.sounds_header}
          </h2>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-[600px]">
            {messages.sounds_info}
          </p>
          <div className="w-full max-w-md h-1 bg-gradient-to-r from-dj-gold via-dj-purple to-dj-gold rounded-full"></div>
        </div>
      </div>
    </section>
    );
}