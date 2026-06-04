// /api/contact.js
import { Resend } from 'resend';

// Инициализация Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Обработчик запросов
export default async function handler(req, res) {
  // Получаем origin для CORS
  const origin = req.headers.origin || '*';
  
  // CORS заголовки
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Обработка preflight OPTIONS запроса
  if (req.method === 'OPTIONS') {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(204).end();
  }

  // Обработка GET запроса (для тестирования)
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

  // Обработка POST запроса (основная логика)
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

  // Логируем входящий запрос
  console.log('=== CONTACT API REQUEST ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Has RESEND_API_KEY:', !!process.env.RESEND_API_KEY);
  console.log('Has CONTACT_EMAIL:', !!process.env.CONTACT_EMAIL);

  try {
    // Деструктуризация данных из body
    const { name, email, message, subject } = req.body;

    // Валидация обязательных полей
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

    // Проверка наличия CONTACT_EMAIL
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

    // Подготовка данных для отправки email
    const emailData = {
      from: process.env.EMAIL_FROM || 'Contact Form <onboarding@infraforge.vercel.app>',
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

    // Отправка email через Resend
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

    // Успешный ответ
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

    // Отправка ошибки клиенту
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      error: error.message || 'Internal server error'
    });
  }
}

// Утилита для экранирования HTML
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