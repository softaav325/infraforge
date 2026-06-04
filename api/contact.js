// /api/contact.js
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Request handler
export default async function handler(req, res) {
  // Get origin for CORS
  const origin = req.headers.origin || '*';
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(204).end();
  }

  // Handle GET request (for testing)
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

  // Handle POST request (main logic)
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

  // Log incoming request
  console.log('=== CONTACT API REQUEST ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Has RESEND_API_KEY:', !!process.env.RESEND_API_KEY);
  console.log('Has CONTACT_EMAIL:', !!process.env.CONTACT_EMAIL);

  try {
    // Destructure data from body
    const { name, email, message, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'message']
      });
    }

    // Check if CONTACT_EMAIL is set
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('Server configuration error: CONTACT_EMAIL is not set');
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ 
        error: 'Server configuration error: CONTACT_EMAIL missing'
      });
    }

    // Prepare email data for sending
    const emailData = {
      from: process.env.EMAIL_FROM || 'Contact Form <onboarding@resend.dev>',
      to: [contactEmail],
      subject: `New Contact Form: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Message from Contact Form</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject || 'General Inquiry')}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
      replyTo: email,
    };

    console.log('Sending email via Resend...');

    // Send email via Resend
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend API error:', error);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ 
        error: error.message || 'Failed to send email'
      });
    }

    console.log('✅ Email sent successfully! ID:', data?.id);

    // Successful response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id
    });

  } catch (error) {
    console.error('=== CONTACT API ERROR ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);

    // Send error to client
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      error: error.message || 'Internal server error'
    });
  }
}

// Utility for HTML escaping
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  return String(text).replace(/[&<>"'`=\/]/g, m => map[m]);
}
