import { useDraggable, useDroppable } from "@dnd-kit/core";

interface TileProps {
  tile: number;
  index: number;
  isCheatMode: boolean;
  solved: boolean;
  onClick: () => void;
}

function Tile({ tile, index, isCheatMode, solved, onClick }: TileProps) {
  const { attributes, listeners, setNodeRef: setDragRef, transform } = useDraggable({
    id: index,
    disabled: !isCheatMode,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: index,
    disabled: !isCheatMode,
  });

  const animationStyle = solved && tile !== 0 ? {
  animation: `tile-pop 0.4s ease ${index * 0.05}s forwards`
} : {};

  const row = Math.floor(index / 4);
  const col = index % 4;

  const tileSize = 80;
  const gap = 8;

  const style = {
    position: 'absolute' as const,
    top: row * (tileSize + gap),
    left: col * (tileSize + gap),
    width: tileSize,
    height: tileSize,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: transform ? 50 : 10,
    transition: transform ? undefined : 'top 0.15s ease, left 0.15s ease',
    ...animationStyle,
  };

  return (
    <div
      ref={(node) => { setDragRef(node); setDropRef(node); }}
      style={style}
      onClick={onClick}
      {...(isCheatMode ? { ...attributes, ...listeners } : {})}
      className={`flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer transition-colors
        ${tile === 0 
          ? "bg-gray-300" 
          : isOver && isCheatMode 
            ? "bg-blue-100 border-blue-300" 
            : "bg-white border border-gray-300 hover:bg-gray-50"}
      `}
    >
      {tile !== 0 && tile}
    </div>
  );
}

export default Tile;