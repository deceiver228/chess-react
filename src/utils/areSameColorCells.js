export const areSameColorCells = (coords1, coords2) => 
	(coords1.x + coords1.y) % 2 === (coords2.x + coords2.y) % 2 // return automaticly