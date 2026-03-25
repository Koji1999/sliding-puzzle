import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { getShuffledBoard, isSolved, moveTile, swapTiles } from "./utils/puzzle";
import Tile from "./components/Tile";

function App() {
  const [tiles, setTiles] = useState<number[]>(getShuffledBoard);
  const [moves, setMoves] = useState(0);
  const [isCheatMode, setIsCheatMode] = useState(false);

  const solved = isSolved(tiles);

  const handleTileClick = (index: number) => {
    if (solved) return;
    const newTiles = moveTile(tiles, index);
    if (newTiles !== tiles) setMoves(m => m + 1);
    setTiles(newTiles);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    setTiles(prev => swapTiles(prev, Number(active.id), Number(over.id)));
    setMoves(m => m + 1);
  };

  const handlePlayAgain = () => {
    setTiles(getShuffledBoard());
    setMoves(0);
    setIsCheatMode(false);
  };

  const movesDisplay = solved ? (
    <p className="text-gray-500 flex justify-center w-100">Solved in {moves} moves</p>
  ) : (
    <div className="flex justify-between w-80">
      <p className="text-gray-500">Moves: {moves}</p>
      <button
        onClick={() => setIsCheatMode(prev => !prev)}
        className="text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        {isCheatMode ? "Cheat Mode: ON\u00A0" : "Cheat Mode: OFF"}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      {solved ? (
        <h1 className="text-3xl font-bold mb-6">You solved it! 🎉</h1>
      ) : (
        <h1 className="text-3xl font-bold mb-6">Sliding Puzzle</h1>
      )}

      <div className="flex justify-between w-80 mb-5">
        {movesDisplay}
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className={`p-3 rounded-xl transition-all duration-300 relative z-30
          ${isCheatMode && !solved
            ? "ring-2 ring-yellow-400 bg-yellow-50 cheat-glow"
            : "bg-gray-100"
          }`}>
          <div className="grid grid-cols-4 gap-2">
            {tiles.map((tile, index) => (
              <Tile
                key={index}
                tile={tile}
                index={index}
                isCheatMode={isCheatMode}
                onClick={() => handleTileClick(index)}
              />
            ))}
          </div>
        </div>
      </DndContext>

      {solved ? (
        <button
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      ) : (
        <button
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => { setTiles(getShuffledBoard()); setMoves(0); }}
        >
          Shuffle
        </button>
      )}

    </div>
  )
}

export default App