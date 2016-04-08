# hubot-webhook-cmds
Implement Hubot commands as via webhooks

## Installing
`npm install hubot-webhook-cmds`

## Usage
Add to your Hubot instance's `external-scripts.json`.

## Webhook input format
When adding a webhook, you may specify it as accepting either `plaintext` or `json` input. The `Content-Type` header is set to `text/plain` or `application/json` respectively when performing the request to the webhook.

### `plaintext`
Input data is sent as...

    [room] <user> message

...where `room` is the room the message was sent from, `user` is the name of the user who sent the message, and `message` is the message itself.

### `json`
Input data is sent as...

```json
{
    "user": {
        "id": "user id",
        "name": "user name"
    },
    "message": "message",
    "room": "room"
}
```

## Webhook output format
The output format may be either plaintext or JSON (independant of which format was specified as input). The format of the output is determined from the `Content-Type` header; if `application/json`, it is assumed to be JSON, otherwise it's assumed to be plaintext.

### Plaintext
The output is just sent straight through as a response to the user who triggered the webhook command. There is no restriction on format.

### JSON
The output should be a JSON object of the form...

```json
{
    "response": "message to send as a response to the user"
}
```

## License
The MIT License (MIT)

Copyright (c) 2016 Raymond Hammarling

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
