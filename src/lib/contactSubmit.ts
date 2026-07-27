const RECIPIENT = 'Yaara@yl-law.net'

export interface ContactSubmission {
  fullName: string
  email: string
  phone: string
  message: string
  subject: string
}

/** Posts a lead/contact form to the API Gateway endpoint that emails the
 *  firm. The API has no dedicated phone field, so it's prepended to the
 *  message body. Throws on a non-OK response or network failure. */
export async function submitContactForm({ fullName, email, phone, message, subject }: ContactSubmission): Promise<void> {
  const endpoint = import.meta.env.VITE_EMAIL_SERVICE_LAMBDA
  const apiKey = import.meta.env.VITE_API_KEY_EMAIL_SERVICE
  if (!endpoint || !apiKey) {
    throw new Error('missing VITE_EMAIL_SERVICE_LAMBDA / VITE_API_KEY_EMAIL_SERVICE')
  }

  const body = {
    fullName,
    email,
    to: RECIPIENT,
    subject,
    message: `טלפון: ${phone}${message ? `\n\n${message}` : ''}`,
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`contact submit failed: ${res.status}`)
  }
}
