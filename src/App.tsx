import { useState } from "react";
import { getShuffledBoard, isSolved, moveTile } from "./utils/puzzle";

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

  const handlePlayAgain = () => {
    setTiles(getShuffledBoard());
    setMoves(0);
    setIsCheatMode(false);
  };

  const movesDisplay = solved ? (
    <p className="text-gray-500">Solved in {moves} moves</p>
  ) : (
    <div className="flex justify-between w-80">
      <p className="text-gray-500">Moves: {moves}</p>
      <button
        onClick={() => setIsCheatMode(prev => !prev)}
        className="text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        {isCheatMode ? "Cheat Mode: ON " : "Cheat Mode: OFF"}
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

      <div className="flex justify-between w-80 mb-4">
        {movesDisplay}
      </div>

      <div className={`p-3 rounded-xl transition-all duration-300 relative z-30
        ${isCheatMode
          ? "ring-2 ring-yellow-400 animate-pulse bg-yellow-50 cheat-glow"
          : "bg-gray-100"
        }`}>
        <div className="grid grid-cols-4 gap-2">
          {tiles.map((tile, index) => (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              className={`w-20 h-20 flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer
                ${tile === 0 ? "bg-gray-200" : "bg-white border border-gray-300 hover:bg-gray-50"}`}
            >
              {tile !== 0 && tile}
            </div>
          ))}
        </div>
      </div>

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