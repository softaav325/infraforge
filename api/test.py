import json

def handler(environ, start_response):
    """
    Простой WSGI обработчик для Vercel.
    """
    
    # Данные, которые мы хотим вернуть
    response_data = {
        "status": "success",
        "message": "Python API работает на Vercel!",
        "timestamp": "2026-06-01",
        "test": True
    }

    # Заголовки ответа
    response_headers = [
        ('Content-Type', 'application/json'),
        ('Access-Control-Allow-Origin', '*')  # Разрешаем запросы с любого домена (CORS)
    ]


    start_response('200 OK', response_headers)

    return [json.dumps(response_data).encode('utf-8')]