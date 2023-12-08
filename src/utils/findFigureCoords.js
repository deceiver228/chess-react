export const findFigureCoords = (figure, type) => {
	let results = [];
	figure.forEach((num, i) => {
		num.forEach((f, j) => {
			if (f === type)
				results.push({x: i, y: j});
		})
	})
	return results;
}