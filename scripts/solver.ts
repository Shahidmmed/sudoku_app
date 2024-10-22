// Takes an index (from 0 to 80) and converts it into row and column coordinates in a 9x9 Sudoku grid
const indexToRowCol = (index: number): { row: number; col: number } => {
  return { row: Math.floor(index / 9), col: index % 9 };
};

// Does the reverse, taking row and column coordinates and converting them into a single index
const rowColToIndex = (row: number, col: number): number => row * 9 + col;

// Checks if it's valid to place a specific value at a given index on the Sudoku board
// If the value is not present in the same row, column, or 3x3 subgrid
const acceptable = (board: number[], index: number, value: number): boolean => {
  const { row, col } = indexToRowCol(index);

  // Check row and column
  for (let r = 0; r < 9; ++r) {
    if (board[rowColToIndex(r, col)] === value) return false;
  }
  for (let c = 0; c < 9; ++c) {
    if (board[rowColToIndex(row, c)] === value) return false;
  }

  // Check 3x3 subgrid
  const r1 = Math.floor(row / 3) * 3;
  const c1 = Math.floor(col / 3) * 3;
  for (let r = r1; r < r1 + 3; ++r) {
    for (let c = c1; c < c1 + 3; ++c) {
      if (board[rowColToIndex(r, c)] === value) return false;
    }
  }

  return true;
};

// Returns an array of valid numbers that can be placed at a given index on the Sudoku board
const getChoices = (board: number[], index: number): number[] => {
  const choices: number[] = [];

  for (let value = 1; value <= 9; ++value) {
    if (acceptable(board, index, value)) {
      choices.push(value);
    }
  }
  return choices;
};

// Finds the best cell to fill next (the one with the fewest valid options)
const bestBet = (
  board: number[]
): { index: number | undefined; moves: number[] | undefined } => {
  let index: number | undefined;
  let moves: number[] | undefined;
  let bestLen = 100;

  for (let i = 0; i < 81; ++i) {
    if (board[i] === 0) {
      const m = getChoices(board, i);
      if (m.length < bestLen) {
        bestLen = m.length;
        moves = m;
        index = i;
        if (bestLen === 0) break;
      }
    }
  }
  return { index, moves };
};

// Converts a flat array into a 2D array for the Sudoku grid
export function flatTo2DArray(flatArray: number[]): number[][] {
  const size = Math.sqrt(flatArray.length);
  const result: number[][] = [];
  for (let i = 0; i < size; i++) {
    result.push(flatArray.slice(i * size, (i + 1) * size));
  }
  return result;
}

// Solves the Sudoku puzzle using a backtracking algorithm
export const solve = (board: number[]): number[][] | 0 => {
  const { index, moves } = bestBet(board);
  if (index == null) return flatTo2DArray(board); // Return the solved grid.

  for (const m of moves!) {
    board[index] = m;
    const result = solve(board);
    if (result !== 0) return result; // If a solution is found, return it.
  }

  board[index] = 0;
  return 0; // Return 0 if no solution is found.
};
