import { useDraggable, useDroppable } from "@dnd-kit/core";

interface TileProps {
  tile: number;
  index: number;
  isCheatMode: boolean;
  onClick: () => void;
}

function Tile({ tile, index, isCheatMode, onClick }: TileProps) {
  const { attributes, listeners, setNodeRef: setDragRef, transform } = useDraggable({
    id: index,
    disabled: !isCheatMode,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: index,
    disabled: !isCheatMode,
  });

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    zIndex: 50,
  } : undefined;

  return (
    <div
      ref={(node) => { setDragRef(node); setDropRef(node); }}
      style={style}
      onClick={onClick}
      {...(isCheatMode ? { ...attributes, ...listeners } : {})}
      className={`w-20 h-20 flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer transition-colors
        ${tile === 0 ? "bg-gray-200" : "bg-white border border-gray-300 hover:bg-gray-50"}
        ${isOver && isCheatMode && tile !== 0 ? "bg-blue-100 border-blue-300" : ""}
      `}
    >
      {tile !== 0 && tile}
    </div>
  );
}

export default Tile;