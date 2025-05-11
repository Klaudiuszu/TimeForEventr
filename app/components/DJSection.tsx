import Image from 'next/image';

interface DJSectionProps {
    messages: Record<string, string>;
}

export default function DJSection({ messages }: DJSectionProps) {
    return (
        <section id='about' className="w-full overflow-hidden bg-gradient-to-b from-dj-dark to-[#2a2725]">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-8">
                <div className="flex-1 flex justify-center">
                    <Image 
                        src="/dominik.jpeg" 
                        priority 
                        alt="DJ Silhouette"
                        width={400} 
                        height={400}
                        className="object-contain drop-shadow-2xl bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-xl hover:border-dj-purple/50 transition-colors duration-300"
                    />
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <h2 className="text-3xl md:text-6xl text-dj-gold font-bold drop-shadow-lg">
                        {messages.about_me_header}
                    </h2>
                    <p className="text-lg md:text-xl drop-shadow-md text-white/90">
                        {messages.about_me_text}
                    </p>
                    <p className="text-lg md:text-xl drop-shadow-md text-white/90 mt-4">
                        {messages.about_me_text2}
                    </p>
                    <div className="w-full h-1 bg-gradient-to-r from-dj-gold via-dj-purple to-dj-gold rounded-full mt-6"></div>
                </div>
            </div>
        </section>
    );
}