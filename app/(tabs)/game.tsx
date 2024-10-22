import React, { useState } from "react";
import SudokuBoard from "@/components/SudokuBoard";
import { View, Text, Button } from "react-native";
import { solve, flatTo2DArray } from "@/scripts/js/solver";
import { generateSudokuPuzzle } from "@/scripts/js/loader";

const Game: React.FC = () => {
  const [sudokuBoard, setSudokuBoard] = useState<number[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  const [error, setError] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [solved, setSolved] = useState<number[][]>([]);

  const convertInputsToBoard = (): number[][] => {
    return sudokuBoard.map((row) =>
      row.map((cell) => (typeof cell === "number" ? cell : 0))
    );
  };

  const loadSudoku = () => {
    setIsSolved(false);
    const sudokuProblem = generateSudokuPuzzle();
    if (sudokuProblem) {
      const solvedPuzzle = solve(sudokuProblem.flat());
      setSolved(flatTo2DArray(solvedPuzzle));
      setSudokuBoard(sudokuProblem);
    } else {
      const errorMessage = "Could not generate board.";
      setError(errorMessage);
    }
  };

  const handleInputChange = (
    event: { target: { value: string } },
    rowIndex: number,
    colIndex: number
  ) => {
    const newValue = event.target.value;
    if (!isNaN(Number(newValue)) && /^\d{0,1}$/.test(newValue)) {
      const newBoard = [...sudokuBoard];
      newBoard[rowIndex][colIndex] = parseInt(newValue) || 0;
      setSudokuBoard(newBoard);
      setError(null);

      if (solved.length) {
        const solvedValue = solved[rowIndex][colIndex];
        if (newValue !== "" && parseInt(newValue) !== solvedValue) {
          setError("Incorrect input. Please review your solution.");
        }
      }
    } else {
      setError("Please enter a valid single digit (1-9).");
    }
  };

  const solveSudoku = () => {
    if (isSolved) {
      setError("The board is already solved.");
      return;
    }

    const flatBoard = convertInputsToBoard().flat();
    const solvedBoard = solve(flatBoard);

    if (solvedBoard) {
      setSudokuBoard(flatTo2DArray(solvedBoard));
      setIsSolved(true);
    } else {
      setError("No solution found.");
    }
  };

  const clearBoard = () => {
    setSudokuBoard(Array.from({ length: 9 }, () => Array(9).fill(0)));
    setIsSolved(false);
    setError(null);
  };

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Sudoku Solver</Text>
      <View className="bg-white p-4 rounded-lg shadow-md mb-4">
        <SudokuBoard
          sudokuBoard={sudokuBoard}
          handleInputChange={handleInputChange}
        />
        <View className="flex-row justify-around mt-4">
          <Button title="Solve" onPress={solveSudoku} />
          <Button title="Clear" onPress={clearBoard} />
          <Button title="Load" onPress={loadSudoku} />
        </View>
      </View>
      <View className="mt-4">
        {error && <Text className="text-red-500">{error}</Text>}
        <Text className="text-lg mt-4">Rules:</Text>
        <Text className="mt-2">
          The goal of Sudoku is to fill in a 9×9 grid with digits so that each
          column, row, and 3×3 section contain the numbers between 1 to 9. At
          the beginning of the game, the 9×9 grid will have some of the squares
          filled in. Your job is to use logic to fill in the missing digits and
          complete the grid. Don’t forget, a move is incorrect if:
        </Text>
        <Text className="mt-2">
          👉 Any row contains more than one of the same number from 1 to 9
        </Text>
        <Text className="mt-2">
          👉 Any column contains more than one of the same number from 1 to 9
        </Text>
        <Text className="mt-2">
          👉 Any 3×3 grid contains more than one of the same number from 1 to 9
        </Text>
      </View>
    </View>
  );
};

export default Game;
