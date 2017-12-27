import os
import asyncio

from sanic import Sanic
from sanic.request import Request
from sanic.response import HTTPResponse
import aiohttp

app = Sanic()

USERS = {}
TOKEN = os.environ.get('TOKEN') or 'tck73'
USERNAME = os.environ.get('USERNAME') or 'Blanche50'


@app.get('/')
async def ping(request: Request) -> HTTPResponse:
    return HTTPResponse(status=200)


@app.post('/')
async def start(request: Request) -> HTTPResponse:
    data = request.json['data']
    event = request.json['event']

    if event == 'joined-chat':
        await handle_join(data['user']['username'], data['chat']['slug'])
    elif event == 'left-chat':
        await handle_left(data['user']['username'])
    elif event == 'new-message':
        await handle_new_message(data['author']['username'], data['text'])

    return HTTPResponse(status=200)


async def handle_join(username, chat):
    if username == USERNAME:
        return

    USERS[username] = {'chat': chat, 'state': 'joined'}

    buttons = [{'name': 'Пока', 'value': 'bye'}, {'name': 'Здравствуйте', 'value': 'hello'}]
    await send_message(chat, 'Привет', buttons=buttons)


async def handle_left(username):
    if username == USERNAME:
        return

    if username in USERS:
        del USERS[username]


async def handle_new_message(username, text):
    if username == USERNAME:
        return

    chat = USERS[username]['chat']
    state = USERS[username]['state']

    if state == 'joined' and text == 'bye':
        await send_message(chat, 'Как невежливо...')
        USERS[username]['state'] = 'bad_person'

    elif state == 'joined' and text == 'hello':
        buttons = [{'name': 'Да', 'value': 'yes'}, {'name': 'Нет', 'value': 'no'}]
        await send_message(chat, 'Я слишком простой бот и пока больше ничего не умею 🤓')
        await send_message(chat, 'Начать сначала?', buttons)
        USERS[username]['state'] = 'good_person'

    elif state == 'bad_person':
        await send_message(chat, 'Не хочу с тобой разговаривать')

    elif state == 'good_person' and text == 'yes':
        await handle_left(username)
        await handle_join(username, chat)

    elif state == 'good_person' and text == 'no':
        await send_message(chat, 'Ок.')
        USERS[username]['state'] = 'end'


async def send_message(chat, text, buttons=None):
    await asyncio.sleep(0.4)

    async with aiohttp.ClientSession() as session:
        url = 'https://bo-chat.herokuapp.com/chats/{}'.format(chat)
        data = {'message': {'text': text, 'buttons': buttons or []}, 'token': TOKEN}

        await session.post(url, json=data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT') or 3002)
