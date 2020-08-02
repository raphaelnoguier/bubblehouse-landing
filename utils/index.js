/* SVG */
import ImageIcon from '~/components/Svgs/ImageIcon';
import BoardIcon from '~/components/Svgs/BoardIcon';
import GridIcon from '~/components/Svgs/GridIcon';

const map = (value, start1, stop1, start2, stop2) => (
	start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
);

const clamp = (value, min, max) => (
	Math.min(Math.max(value, min), max)
);

const vw = (v) => {
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	return (v * w) / 100
};

const isTouchDevice = () => {
    let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

    let mq = (query) => window.matchMedia(query).matches;

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
	}

    let query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
};

export default {
	map,
	clamp,
	vw,
	isTouchDevice
}