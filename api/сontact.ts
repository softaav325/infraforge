// api/contact.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  const origin = req.headers.origin || '*';
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return res.setHeader('Access-Control-Allow-Origin', origin).status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).setHeader('Content-Type', 'application/json').setHeader('Access-Control-Allow-Origin', origin).json({ 
      error: 'Method not allowed' 
    });
  }

  try {
    const { name, email, message, subject } = req.body;

    if (!name || !email || !message) {
      return res.status(400).setHeader('Content-Type', 'application/json').setHeader('Access-Control-Allow-Origin', origin).json({ 
        error: 'Missing required fields' 
      });
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      return res.status(500).setHeader('Content-Type', 'application/json').setHeader('Access-Control-Allow-Origin', origin).json({ 
        error: 'Server configuration error: CONTACT_EMAIL missing' 
      });
    }

    const emailData = {
      from: 'Contact Form <onboarding@infraforge.vercel.app>', 
      to: [contactEmail],
      subject: `New Contact Form: ${subject || 'General Inquiry'}`,
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
      replyTo: email, 
    };

    const { data: result, error } = await resend.emails.send(emailData);

    if (error) {
      return res.status(400).setHeader('Content-Type', 'application/json').setHeader('Access-Control-Allow-Origin', origin).json({ 
        error: error.message || 'Failed to send email' 
      });
    }

    return res.status(200).setHeader('Content-Type', 'application/json').setHeader('Access-Control-Allow-Origin', origin).json({ 
      success: true, 
      id: result?.id 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).setHeader('Content-Type', 'application/json').setHeader('Access-Control-Allow-Origin', origin).json({ 
      error: error.message || 'Internal server error' 
    });
  }
};
