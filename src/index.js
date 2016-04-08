// Description
//   Webhooks as commands for your local Hubot!
//
// Commands:
//   hubot add hook
//
// Author:
//   https://github.com/raymond-h/

import got from 'got';
import { pick } from 'lodash';

function asyncify(cb) {
    return (res, ...rest) => {
        cb(res, ...rest)
        .catch((err) => {
            res.robot.emit('error', err, res);
        });
    };
}

function contentTypeForType(type) {
    switch(type) {
        case 'plaintext': return 'text/plain';
        case 'json': return 'application/json';
    }
}

function bodyForType(res, type) {
    switch(type) {
        case 'plaintext':
            return `[${res.message.room}] <${res.message.user.name}> ${res.message.text}`;

        case 'json':
            return JSON.stringify(pick(res.message, ['user', 'text', 'room']), null, '    ');
    }
}

function handleMessage(res, httpRes) {
    if(/application\/json/i.test(httpRes.headers['content-type'])) {
        const json = JSON.parse(httpRes.body);

        res.reply(json.response);
    }
    else {
        res.reply(httpRes.body);
    }
}

export default function(robot) {
    function addCommand(matcher, type, method, url) {
        robot.respond(new RegExp(matcher, 'i'),
            asyncify(async (res) => {
                const out = await got(url, {
                    method,
                    body: bodyForType(res, type),
                    headers: {
                        'content-type': contentTypeForType(type)
                    }
                });

                handleMessage(res, out);
            })
        );
    }

    robot.respond(/add hook "(.+?)":(?: (json|plaintext))? (\w+) (\S+)$/i,
        { id: 'webhookcmd.add' },
        asyncify(async (res) => {
            const [, matcher, type = 'plaintext', method, url] = res.match;

            res.reply('OK SO when I hear "' + matcher + '", I should ' + method + ' ' + url);

            addCommand(matcher.trim(), type, method, url);
        })
    );
}
