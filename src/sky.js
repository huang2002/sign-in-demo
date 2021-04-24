import { $scene, h, preloadImage, SKY_BG_URL, STAR_URL, STAR_SIZE } from './common.js';

preloadImage(SKY_BG_URL);
preloadImage(STAR_URL);

/**
 * @type {X.ReactiveValue<HTMLElement | null>}
 */
const $skyRef = X.toReactive(null);

/**
 * @type {HTMLImageElement | null}
 */
let currentStar = null;

let x0 = 0;
let y0 = 0;

export const Sky = h('div', {
    id: 'sky-container',
    style: {
        display: $scene.map(
            scene => (scene === 'sky' ? 'flex' : 'none')
        ),
        flex: '1',
        width: '100%',
        height: '100%',
        paddingBottom: '4em',
    },
},
    h('div', {
        id: 'sky',
        ref: $skyRef,
        style: {
            display: 'relative',
            width: '320px',
            height: '480px',
            margin: '1em auto',
            backgroundColor: '#000',
            backgroundImage: 'url("./sky_bg.jpg")',
            backgroundSize: '320px 480px',
        },
    },

    ),
    h('nav', {
        id: 'toolbar',
        style: {
            position: 'fixed',
            left: '0',
            bottom: '0',
            width: '100%',
            paddingBottom: '2em',
            textAlign: 'center',
        },
    },
        D.Button({
            listeners: {
                click() {
                    const bounds = $skyRef.current.getBoundingClientRect();
                    x0 = bounds.width / 2 - STAR_SIZE / 2;
                    y0 = bounds.height / 2 - STAR_SIZE / 2;
                    const star = h('img', {
                        src: STAR_URL,
                        style: {
                            position: 'absolute',
                            width: `${STAR_SIZE}px`,
                            height: `${STAR_SIZE}px`,
                            marginLeft: `${x0}px`,
                            marginTop: `${y0}px`,
                        },
                    });
                    $skyRef.current.appendChild(star);
                    currentStar = star;
                },
            },
        },
            '添加'
        ),
    ),
);

/**
 * @param {number} y
 */
const startDrag = (x, y) => {
    isDragging = true;
    x0 = x0 - x;
    y0 = y0 - y;
};

/**
 * @param {number} y
 */
const drag = (x, y) => {
    currentStar.style.marginLeft = `${x + x0}px`;
    currentStar.style.marginTop = `${y + y0}px`;
};

/**
 * @param {number} y
 */
const stopDrag = (x, y) => {
    drag(x, y);
    isDragging = false;
    x0 = x + x0;
    y0 = y + y0;
};

let isDragging = false;

if (navigator.maxTouchPoints) {

    window.addEventListener('touchstart', event => {
        if (isDragging || !currentStar || event.target.tagName === 'BUTTON') {
            return;
        }
        event.preventDefault();
        const touch = event.changedTouches[0];
        startDrag(touch.clientX, touch.clientY);
    }, { passive: false });

    window.addEventListener('touchmove', event => {
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        const touch = event.changedTouches[0];
        drag(touch.clientX, touch.clientY);
    }, { passive: false });

    window.addEventListener('touchend', event => {
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        const touch = event.changedTouches[0];
        stopDrag(touch.clientX, touch.clientY);
    }, { passive: false });

} else {

    window.addEventListener('mousedown', event => {
        if (isDragging || !currentStar || event.target.tagName === 'BUTTON') {
            return;
        }
        event.preventDefault();
        startDrag(event.clientX, event.clientY);
    }, { passive: false });

    window.addEventListener('mousemove', event => {
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        drag(event.clientX, event.clientY);
    }, { passive: false });

    window.addEventListener('mouseup', event => {
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        stopDrag(event.clientX, event.clientY);
    }, { passive: false });

}
