const map = (value, start1, stop1, start2, stop2) => (
	start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
);

const clamp = (value, min, max) => (
	Math.min(Math.max(value, min), max)
);

export default {
	map,
	clamp
}