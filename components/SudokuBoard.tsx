import React from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

interface SudokuBoardProps {
  sudokuBoard: number[][];
  handleInputChange: (
    event: { target: { value: string } },
    rowIndex: number,
    colIndex: number
  ) => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({
  sudokuBoard,
  handleInputChange,
}) => {
  function getSquareColor(rowIndex: number, colIndex: number): string {
    // Calculate the square index (0 to 8) based on row and column indices.
    const squareIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);

    // Apply different colors to alternating 3x3 squares.
    return squareIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200";
  }

  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    rowIndex: number,
    colIndex: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const mockEvent = { target: { value: "" } };
      handleInputChange(mockEvent, rowIndex, colIndex);
    }
  };

  return (
    <View className="">
      {sudokuBoard.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row">
          {row.map((cell, colIndex) => (
            <TextInput
              key={`${rowIndex}-${colIndex}`}
              className={`border border-gray-300 w-9 h-9 text-center text-lg ${getSquareColor(
                rowIndex,
                colIndex
              )} ${rowIndex === 2 || rowIndex === 5 ? "border-b-2" : ""} ${
                colIndex === 2 || colIndex === 5 ? "border-r-2" : ""
              }`}
              keyboardType="number-pad"
              maxLength={1}
              value={cell ? cell.toString() : ""}
              onChangeText={(value) =>
                handleInputChange({ target: { value } }, rowIndex, colIndex)
              }
              onKeyPress={(e) => handleKeyDown(e, rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default SudokuBoard;
