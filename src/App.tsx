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
      <h1 className="text-3xl font-bold mb-6">Sliding Puzzle</h1>
      
      <div className={`p-3 rounded-xl transition-all duration-300 z-10
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

      <div className="flex justify-between w-80 mt-4">
        <p className="text-gray-500">Moves: {moves}</p>
        <button
          onClick={() => setIsCheatMode(prev => !prev)}
          className="text-gray-500 hover:text-gray-800 transition-colors font-medium"
        >
          {isCheatMode ? "Cheat Mode: ON " : "Cheat Mode: OFF"}
        </button>
      </div>

      <button
        className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors"
        onClick={() => { setTiles(getShuffledBoard()); setMoves(0); }}
      >
        Shuffle
      </button>

      {solved && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" />
          <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl pointer-events-auto" 
                style={{marginTop: '-300px'}}>
              <p className="text-4xl">🎉</p>
              <h2 className="text-2xl font-bold text-gray-800">You solved it!</h2>
              <p className="text-gray-500">Completed in {moves} moves</p>
              <button
                onClick={() => { setTiles(getShuffledBoard()); setMoves(0); }}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Play Again
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App