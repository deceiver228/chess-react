import { getCode } from "./getCode";

export const getNewMoveNotation = ({figures, figure, num, letter, x, y, promotesTo}) => {
	let note = '';

	num = Number(num);	
	letter = Number(letter);

	if (figure[1] === 'k' && Math.abs(letter - y) === 2)
		if (letter > y)
			return '0-0-0';
		else
			return '0-0';

	if (figure[1] !== 'p') {
		note += figure[1].toUpperCase();
		if (figures[x][y]) {
			note += 'x';
		}
	} else if (num !== x && letter !== y) { // для пешек при взятии
		note += getCode(letter + 1) + 'x';
	}

	note += getCode(y + 1) + (x + 1);

	if (promotesTo)
		note += '=' + promotesTo.toUpperCase()
	
	return note;
}