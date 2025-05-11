interface CookiesProps {
  messages: Record<string, string>;
}

export default function Cookies({ messages }: CookiesProps) {
  return (
    <main className="py-28 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{messages.cookies_title}</h1>
        
        <div className="prose prose-invert">
          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.cookies_what_are}</h2>
          <p>{messages.cookies_what_are_content}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.cookies_how_use}</h2>
          <p>{messages.cookies_how_use_content}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.cookies_types}</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>{messages.cookies_essential}:</strong> {messages.cookies_essential_desc}</li>
            <li><strong>{messages.cookies_performance}:</strong> {messages.cookies_performance_desc}</li>
            <li><strong>{messages.cookies_functional}:</strong> {messages.cookies_functional_desc}</li>
            <li><strong>{messages.cookies_marketing}:</strong> {messages.cookies_marketing_desc}</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.cookies_control}</h2>
          <p>{messages.cookies_control_content}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.cookies_changes}</h2>
          <p>{messages.cookies_changes_content}</p>

          <p className="mt-8">{messages.cookies_effective_date}</p>
        </div>
      </div>
    </main>
  );
}