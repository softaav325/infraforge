// /api/contact.js 
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  // origin for CORS
  const origin = req.headers.origin || '*';
  
  // CORS 
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // preflight OPTIONS 
  if (req.method === 'OPTIONS') {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(204).end();
  }

  // GET (FOR testing)
  if (req.method === 'GET') {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      message: 'Contact API is working',
      timestamp: new Date().toISOString(),
      status: 'active'
    });
  }

  // POST 
  if (req.method !== 'POST') {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['POST', 'OPTIONS', 'GET']
    });
  }

  // Loging
  console.log('=== CONTACT API REQUEST ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Has RESEND_API_KEY:', !!process.env.RESEND_API_KEY);
  console.log('Has CONTACT_EMAIL:', !!process.env.CONTACT_EMAIL);

  try {
    const { name, email, message, subject } = req.body;

    // Validate
    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'message'],
        received: { name: !!name, email: !!email, message: !!message }
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format');
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Check CONTACT_EMAIL
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('Server configuration error: CONTACT_EMAIL is not set');
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ 
        error: 'Server configuration error: CONTACT_EMAIL missing',
        hint: 'Please set CONTACT_EMAIL environment variable in Vercel dashboard'
      });
    }

    // Check RESEND_API_KEY
    if (!process.env.RESEND_API_KEY) {
      console.error('Server configuration error: RESEND_API_KEY is not set');
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ 
        error: 'Server configuration error: RESEND_API_KEY missing',
        hint: 'Please set RESEND_API_KEY environment variable in Vercel dashboard'
      });
    }

    // Prepear test email
    const emailData = {
      from: process.env.EMAIL_FROM || 'Contact Form <onboarding@infraforge.vercel.app>',
      to: [contactEmail],
      subject: `New Contact Form: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 30px; background-color: #f8f9fa; border-radius: 10px; max-width: 600px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1a1a1a; margin-top: 0; font-size: 24px;">📩 New Message from Contact Form</h2>
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #4a5568;">Name:</strong> <span style="color: #2d3748;">${escapeHtml(name)}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #4a5568;">Email:</strong> <span style="color: #2d3748;">${escapeHtml(email)}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #4a5568;">Subject:</strong> <span style="color: #2d3748;">${escapeHtml(subject || 'General Inquiry')}</span></p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
            <div>
              <p style="color: #4a5568; margin-bottom: 10px;"><strong>Message:</strong></p>
              <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #2d3748; line-height: 1.6;">${escapeHtml(message)}</div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px;">
              <p>Sent from: ${req.headers.origin || 'Unknown'}</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
      text: `
New Message from Contact Form

Name: ${name}
Email: ${email}
Subject: ${subject || 'General Inquiry'}

Message:
${message}

---
Sent from: ${req.headers.origin || 'Unknown'}
Time: ${new Date().toLocaleString()}
      `.trim()
    };

    console.log('Sending email via Resend...');
    console.log('From:', emailData.from);
    console.log('To:', emailData.to);
    console.log('Subject:', emailData.subject);

    // Send email for Resend
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend API error:', JSON.stringify(error, null, 2));
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ 
        error: error.message || 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', data?.id);

    // Answer
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('=== CONTACT API ERROR ===');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Error:', error);
    console.error('Stack trace:', error.stack);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);

    // Send error
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      error: error.message || 'Internal server error',
      type: error.name,
      timestamp: new Date().toISOString(),
      details: process.env.NODE_ENV === 'development' ? {
        stack: error.stack,
        name: error.name
      } : undefined
    });
  }
}

// Utils HTML
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  return String(text).replace(/[&<>"'`=\/]/g, m => map[m]);
}