'use server';

import { Resend } from 'resend';
import type { ContactFormData } from '@/components/contact-us-section';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <h2 style="color: #212536;">📬 New Contact Form Submission</h2>

      <div style="margin: 1.5rem 0;">
        <p><strong>First Name:</strong> ${data.firstName}</p>
        <p><strong>Last Name:</strong> ${data.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Subject:</strong> ${data.subject}</p>
      </div>

      <div style="background-color: #f9f9f9; border-left: 4px solid #0A6AE7; padding: 1rem; font-size: 1rem; white-space: pre-line;">
        ${data.message}
      </div>

      <hr style="margin: 2rem 0;" />
      <footer style="font-size: 0.8rem; color: #888;">Sent on ${new Date().toLocaleString()}</footer>
    </div>
  `;

  await resend.emails.send({
    from: 'No Reply <noreply@contact.korefocus.com>',
    to: ['julien.lejay@korefocus.com'],
    subject: `📥 Contact Form: ${data.firstName} ${data.lastName}`,
    html,
  });
}
