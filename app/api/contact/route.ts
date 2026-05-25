import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, subject } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      return Response.json(
        { error: 'Server configuration error: CONTACT_EMAIL missing' },
        { status: 500 }
      );
    }

    const data = {
      from: 'Contact Form <onboarding@resend.dev>',
      to: [contactEmail],
      subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">New Message from Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    const { data: result, error } = await resend.emails.send(data);

    if (error) {
      return Response.json(
        { error: error.message || 'Failed to send email' },
        { status: 400 }
      );
    }

    return Response.json({ success: true, id: result?.id }, { status: 200 });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
