import React from "react";

export default function Terms() {
  return (
    <main className="max-w-5xl mx-auto p-6 md:p-12">
      <h1 className="text-4xl font-extrabold text-violet-700 dark:text-yellow-300 mb-8 text-center">
        Terms of Service
      </h1>
      <section className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          By using CaptionAI, you agree to comply with our terms and conditions designed to ensure a safe, fair, and efficient service.
        </p>
        <p>
          You are responsible for the content you upload and generate captions for and must respect copyright and privacy laws.
        </p>
        <p>
          We reserve the right to suspend or terminate accounts that violate our policies or misuse the platform.
        </p>
        <p>
          CaptionAI is provided "as-is" without warranties. We are not liable for any damages arising from use of the service.
        </p>
        <p>
          These terms may be updated periodically; your continued use constitutes acceptance of any changes.
        </p>
        <p>
          For questions, contact support@captionai.com.
        </p>
      </section>
    </main>
  );
}
