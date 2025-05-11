interface PrivacyPolicyProps {
  messages: Record<string, string>;
}

export default function PrivacyPolicy({ messages }: PrivacyPolicyProps) {
  return (
    <main className="py-28 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{messages.privacy_policy_title}</h1>
        
        <div className="prose prose-invert">
          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.privacy_policy_data_controller}</h2>
          <p>
            Firma Handlowo-Usługowa Dominik Bielawski<br />
            ul. Turystyczna 25, 26-067 Chełmce<br />
            NIP: 9592062671<br />
            REGON: 525505334
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.privacy_policy_contact_form}</h2>
          <p>{messages.privacy_policy_contact_form_description}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.privacy_policy_data_purpose}</h2>
          <p>{messages.privacy_policy_data_purpose_content}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.privacy_policy_data_retention}</h2>
          <p>{messages.privacy_policy_data_retention_content}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.privacy_policy_rights}</h2>
          <p>{messages.privacy_policy_rights_content}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.privacy_policy_security}</h2>
          <p>{messages.privacy_policy_security_content}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">{messages.privacy_policy_changes}</h2>
          <p>{messages.privacy_policy_changes_content}</p>

          <p className="mt-8">{messages.privacy_policy_effective_date}</p>
        </div>
      </div>
    </main>
  );
}