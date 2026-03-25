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
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 font-medium">Cheat Mode</span>
        <button
          onClick={() => setIsCheatMode(prev => !prev)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200
            ${isCheatMode ? "bg-yellow-400" : "bg-gray-300"}`}
        >
          <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
            ${isCheatMode ? "translate-x-6" : "translate-x-0"}`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      {solved ? (
        <div className="border-3 border-gray-800 rounded-xl px-7 py-2 mb-6 bg-white" style={{boxShadow: '5px 5px 0px #1f2937'}}>
          <h1 className="text-2xl font-extrabold text-gray-800">You solved it! 🎉</h1>
        </div>
      ) : (
        <div className="border-3 border-gray-800 rounded-xl px-7 py-2 mb-6 bg-white" style={{boxShadow: '5px 5px 0px #1f2937'}}>
          <h1 className="text-2xl font-extrabold text-gray-800">Sliding Puzzle</h1>
        </div>
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
          <div className="relative grid grid-cols-4 gap-2">
            
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="w-20 h-20 rounded-lg bg-gray-300" />
            ))}

            {tiles.map((tile, index) => (
              <Tile
                key={index}
                tile={tile}
                index={index}
                isCheatMode={isCheatMode}
                solved={solved}
                onClick={() => handleTileClick(index)}
              />
            ))}

          </div>
        </div>
      </DndContext>

      {solved ? (
        <button
          className="mt-4 bg-green-400 border-2 border-green-600 rounded-xl px-6 py-2 font-bold text-green-900 hover:bg-green-300 transition-colors"
          style={{boxShadow: '4px 4px 0px #16a34a'}}
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      ) : (
        <button
          className="mt-4 bg-white border-2 border-gray-300 rounded-xl px-6 py-2 font-bold text-gray-600 hover:border-gray-400 transition-colors"
          style={{boxShadow: '3px 3px 0px #d1d5db'}}
          onClick={() => { setTiles(getShuffledBoard()); setMoves(0); }}
        >
          Shuffle
        </button>
      )}

    </div>
  )
}

export default App