export const copyFigures = figures => {
	const newFigures = new Array(8).fill('').map(_ => new Array(8).fill(''));

	for (let num = 0; num < 8; num++) {
		for (let letter = 0; letter < 8; letter++) {
			newFigures[num][letter] = figures[num][letter]
		}
	}

	return newFigures;
}