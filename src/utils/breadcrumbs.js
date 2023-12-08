export const removeRemainingCrumbs = (state, url) => {
	const idx = state.findIndex(item => item === url);
	return state.slice(0, idx);
}
export const isContainRoute = (state, route) => state.some(url => url === route)