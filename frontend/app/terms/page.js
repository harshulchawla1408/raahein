'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-12 lg:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-gray-600 mb-10">Last updated: May 17, 2025</p>

        <section className="space-y-8 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Raahein platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of the terms, you may not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Use of the Platform</h2>
            <p>
              Raahein is a platform to explore destinations, connect with fellow travelers, and plan your trips. You agree to use it for lawful purposes only and not for any fraudulent or harmful activities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Account Registration</h2>
            <p>
              When registering on Raahein, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. User Content</h2>
            <p>
              Any content you submit — including reviews, destination tips, or images — must not violate any laws or third-party rights. Raahein reserves the right to remove content deemed inappropriate or harmful.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
            <p>
              All content on Raahein, including logos, design, text, and graphics, are the property of Raahein unless otherwise stated. You may not copy, reproduce, or redistribute without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Third-Party Services</h2>
            <p>
              Raahein may use third-party services for bookings, maps, or payments. We are not liable for issues arising from the use of those services, though we aim to only work with trusted providers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
            <p>
              Raahein is not liable for any direct or indirect damages arising from your use of the platform, including delays, cancellations, or data loss. We do our best to ensure reliability, but no platform is perfect.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
            <p>
              We may update these terms occasionally. When we do, we’ll post the updated version here. Continued use of the platform means you accept the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms & Conditions, feel free to reach out at{' '}
              <a href="mailto:support@raahein.com" className="text-blue-600 hover:underline">
                support@raahein.com
              </a>.
            </p>
          </div>
        </section>

        <div className="mt-12 text-center text-sm text-gray-500">
          <Link href="/register" className="text-blue-600 hover:underline">
            ← Back to register
          </Link>
        </div>
      </div>
    </div>
  );
}
