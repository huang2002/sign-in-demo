import { $scene, h } from './common.js';

/**
 * @param {string} text
 * @param {string} target
 */
const FormLabel = (text, target) => (
    h('label', {
        for: target,
    },
        text
    )
);

/**
 * @param {string} id
 * @param {X.ReactiveValue} $value
 */
const FormInput = (id, $value) => (
    D.TextInput({
        id: id,
        name: id,
        bind: $value,
        style: {
            margin: '0',
            width: '10em',
            marginRight: '1em',
            userSelect: 'auto',
        },
    })
);

const $id = X.toReactive('');
const ID_PATTERN = /^\d{8}$/;

export const Form = h('div', {
    id: 'form-container',
    style: {
        display: $scene.map(
            scene => (scene === 'form' ? 'block' : 'none')
        ),
        flex: '1',
        paddingTop: '1em',
        textAlign: 'center',
    },
},
    h('form', {
        id: 'form',
        action: 'javascript:;',
        listeners: {
            submit() {
                const id = $id.current;
                if (!ID_PATTERN.test(id)) {
                    alert('请输入正确的学号！');
                    return;
                }
                alert('签到成功！');
                $scene.setSync('sky');
            },
        },
    },
        D.Section(null,
            FormLabel('学号：', 'id'),
            FormInput('id', $id),
        ),
        D.Section({
            style: {
                marginTop: '1em',
            },
        },
            h('input', {
                type: 'submit',
                class: D.BUTTON_CLASS,
                style: {
                    width: '6em',
                    color: '#000',
                    userSelect: 'auto',
                },
                value: '签到',
            }),
        ),
    ),
);
