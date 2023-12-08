export const addFigures = () => {
	const figures = new Array(8).fill('').map(_ => new Array(8).fill(''))
	
	figures[0][0] = 'wr';
	figures[0][7] = 'wr';
	figures[0][1] = 'wn';
	figures[0][6] = 'wn';
	figures[0][2] = 'wb';
	figures[0][5] = 'wb';
	figures[0][3] = 'wq';
	figures[0][4] = 'wk';
	figures[7][0] = 'br';
	figures[7][7] = 'br';
	figures[7][1] = 'bn';
	figures[7][6] = 'bn';
	figures[7][2] = 'bb';
	figures[7][5] = 'bb';
	figures[7][3] = 'bq';
	figures[7][4] = 'bk';

	for (let i = 0; i < 8; i++) {
	 	figures[1][i] = 'wp';
	 	figures[6][i] = 'bp';
	}
	return figures;
}