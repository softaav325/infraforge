import json

def handler(req, env):
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'status': 'success',
            'message': 'Python API работает на Vercel!',
            'test': True
        })
    }
