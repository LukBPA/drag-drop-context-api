import { ReactNode } from "react";
import { StyledDragItem } from "./DragItem.styles";
import { useDragContext } from "../../providers/DragContext";

interface DragItemProps {
  index: number;
  children: ReactNode;
}

const DragItem: React.FC<DragItemProps> = ({ children, index }) => {
  const { data, draggedItem, onDragStart, onDragEnd, onDragOver } =
    useDragContext();

  const dragStart = (e: any, index: number) => {
    onDragStart(index);

    e.dataTransfer.setData("text/plain", index);
    e.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
  };

  return (
    <StyledDragItem
      $draggedItem={data[index] === draggedItem}
      draggable
      onDragStart={(e: any) => dragStart(e, index)}
      onDragEnd={() => onDragEnd()}
      onDragOver={() => onDragOver(index)}
    >
      {children}
    </StyledDragItem>
  );
};

export default DragItem;
