export function isSolved(tiles: number[]): boolean {
  return tiles.every((tile, index) => {
    if (index === 15) return tile === 0;
    return tile === index + 1;
  });
}

export function shuffle(tiles: number[]): number[] {
  const result = [...tiles];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function isSolvable(tiles: number[]): boolean {
  let inversions = 0;
  const flatTiles = tiles.filter(t => t !== 0);
  
  for (let i = 0; i < flatTiles.length; i++) {
    for (let j = i + 1; j < flatTiles.length; j++) {
      if (flatTiles[i] > flatTiles[j]) inversions++;
    }
  }

  const emptyRowFromBottom = 4 - Math.floor(tiles.indexOf(0) / 4);

  if (emptyRowFromBottom % 2 === 0) {
    return inversions % 2 !== 0;
  } else {
    return inversions % 2 === 0;
  }
}

export function getShuffledBoard(): number[] {
  const solved = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
  let tiles = shuffle(solved);
  while (!isSolvable(tiles)) {
    tiles = shuffle(tiles);
  }
  return tiles;
}

export function moveTile(tiles: number[], index: number): number[] {
  const emptyIndex = tiles.indexOf(0);
  const validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - 4,
    emptyIndex + 4,
  ];

  if (!validMoves.includes(index)) return tiles;

  if (index === emptyIndex - 1 && emptyIndex % 4 === 0) return tiles;
  if (index === emptyIndex + 1 && index % 4 === 0) return tiles;

  const newTiles = [...tiles];
  [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
  return newTiles;
}

export function swapTiles(tiles: number[], fromIndex: number, toIndex: number): number[] {
  const newTiles = [...tiles];
  [newTiles[fromIndex], newTiles[toIndex]] = [newTiles[toIndex], newTiles[fromIndex]];
  return newTiles;
}
