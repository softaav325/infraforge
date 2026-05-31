const API_URL = '/api/chat';
const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Sends a message to the AI chat backend.
 * @param {string} message - The user message to send.
 * @returns {Promise<Object>} - The API response data.
 * @throws {Error} - Throws error if request fails or times out.
 */
export async function sendMessage(message) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }
        
        console.error('API Error:', error);
        throw error;
    }
}
