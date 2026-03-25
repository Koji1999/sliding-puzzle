import { useState } from "react";
import { getShuffledBoard, isSolved, moveTile } from "./utils/puzzle";

function App() {
  const [tiles, setTiles] = useState<number[]>(getShuffledBoard);
  const [moves, setMoves] = useState(0);
  const [isCheatMode, setIsCheatMode] = useState(false); 

  const solved = isSolved(tiles);

  const handleTileClick = (index: number) => {
    const newTiles = moveTile(tiles, index);
    if (newTiles !== tiles) setMoves(m => m + 1);
    setTiles(newTiles);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sliding Puzzle</h1>
      <p className="text-gray-500 mb-4">Moves: {moves}</p>
      {solved && <p className="text-green-500 font-bold mb-4">You solved it! 🎉</p>}
      <div className={`p-3 rounded-xl transition-all duration-300
        ${isCheatMode 
          ? "ring-2 ring-yellow-400 animate-pulse bg-yellow-50 rainbow-glow" 
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
      <button
        className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors"
        onClick={() => { setTiles(getShuffledBoard()); setMoves(0); }}
      >
        Shuffle
      </button>
      <button
        onClick={() => setIsCheatMode(prev => !prev)}
        className="mt-3 px-4 py-2 rounded font-bold transition-all duration-300 bg-gray-200 text-gray-600 hover:bg-gray-300"
      >
        {isCheatMode ? "✨ Turn Off Magic" : "⭐ Use That Magic"}
      </button>
    </div>
  )
}

export default App