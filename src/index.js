import { h } from './common.js';
import { Form } from './form.js';
import { Sky } from './sky.js';

document.body.appendChild(
    h('div', {
        id: 'app',
        style: {
            display: 'flex',
            position: 'fixed',
            flexDirection: 'column',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#FFF',
            userSelect: 'none',
        },
    },
        h('h1', {
            style: {
                marginTop: '1em',
                textAlign: 'center',
                fontSize: '1.2em',
                fontWeight: 'bold',
                textShadow: '0 1px 0 #FFF',
                lineHeight: '3em',
            },
        },
            '口语月签到（demo）'
        ),
        Form,
        Sky,
    )
);
