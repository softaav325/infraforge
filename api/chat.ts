import type { VercelRequest, VercelResponse } from '@vercel/node';

const MODEL = 'openrouter/auto';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.openrouter_api_key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are AI - sites support.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return res.status(200).json({
      answer: data.choices?.[0]?.message?.content ?? '',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
