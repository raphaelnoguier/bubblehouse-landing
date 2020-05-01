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

export default {
	map,
	clamp,
	vw
}