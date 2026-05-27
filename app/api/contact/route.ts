import { NextResponse } from 'next/server';
import { submitContactMessage } from '@/lib/db';
import { isRateLimited, sanitizeObject } from '@/lib/security';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate limit: max 3 contact submissions per minute per IP
    if (isRateLimited(ip, 3, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait a minute before sending another.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    if (honeypot) {
      console.warn("Honeypot triggered by IP:", ip);
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Sanitize data
    const sanitizedData = sanitizeObject({
      name,
      email,
      subject,
      message,
      ipAddress: ip,
    });

    // Save to database
    await submitContactMessage(sanitizedData);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}
