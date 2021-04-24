export const { createElement: h } = X;

export const SKY_BG_URL = './sky_bg.jpg';
export const STAR_URL = './star.png';
export const STAR_SIZE = 20;

/**
 * @typedef {'form' | 'sky'} Scene
 */

/**
 * @type {X.ReactiveValue<Scene>}
 */
export const $scene = X.toReactive('form');

/**
 * @param {string} url
 */
export const preloadImage = (url) => {
    const image = new Image();
    image.src = url;
};
