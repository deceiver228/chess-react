import { copyFigures } from "../utils/copyFigures"

export const moveFigure = ({figures, figure, num, letter, x, y}) => {
	const newFigures = copyFigures(figures);

	if (figure.endsWith('k') && Math.abs(y - letter) > 1) {
		if (y === 2) {
			newFigures[num][0] = '';
			newFigures[num][3] = figure.startsWith('w') ? 'wr' : 'br';
		}
		if (y === 6) {
			newFigures[num][7] = '';
			newFigures[num][5] = figure.startsWith('w') ? 'wr' : 'br';
		}
	}

	newFigures[num][letter] = '';
	newFigures[x][y] = figure;

	return newFigures;	
}

export const movePawn = ({figures, figure, num, letter, x, y}) => {
	const newFigures = copyFigures(figures);
	if (!newFigures[x][y] && x !== num && y !== letter)  // бьем по пустой клетке + по диагонали (взятие на проходе)
		newFigures[num][y] = ''; // удаляем пешку, взятую на проходе
	newFigures[num][letter] = ''; // удаляем пешку, которой походили
	newFigures[x][y] = figure; // ставим пешку

	return newFigures;
}