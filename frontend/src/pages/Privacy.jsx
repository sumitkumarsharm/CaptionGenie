import React from "react";

export default function Privacy() {
  return (
    <main className="max-w-5xl mx-auto p-6 md:p-12">
      <h1 className="text-4xl font-extrabold text-violet-700 dark:text-yellow-300 mb-8 text-center">
        Privacy Policy
      </h1>
      <section className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          At CaptionAI, your privacy and data security are paramount. We collect only the necessary data to provide our services and ensure it is handled safely.
        </p>
        <p>
          Your images and captions are stored securely with enterprise-grade encryption. We strictly comply with SOC 2 privacy guidelines and do not share your data with third parties without consent.
        </p>
        <p>
          We use cookies and analytics minimally to improve user experience but never for targeting or personal advertising.
        </p>
        <p>
          You can request deletion of your data at any time by contacting our support team.
        </p>
        <p>
          For more details, contact us at privacy@captionai.com.
        </p>
      </section>
    </main>
  );
}
