import { ReactNode, useEffect, useState } from "react";
import { DragAreaWrapper } from "./DragArea.styles";
import { useDragContext } from "../../providers/DragContext";

interface DragAreaProps {
  items: any[];
  onChange: (items: any[]) => void;
  children: ReactNode;
}

const DragArea: React.FC<DragAreaProps> = ({ items, onChange, children }) => {
  const { data, setInitialData } = useDragContext();
  const [dragActive, setDragActive] = useState(false);

  const allowDrop = (e: any) => {
    setDragActive(true);
    e.preventDefault();
  };

  const onDrop = () => {
    setDragActive(false);
  };

  useEffect(() => {
    setInitialData(items);
  }, []);

  useEffect(() => {
    onChange(data);
  }, [data]);

  return (
    <DragAreaWrapper
      $dragActive={dragActive}
      onChange={onChange}
      onDragOver={allowDrop}
      onDrop={() => onDrop()}
    >
      {children}
    </DragAreaWrapper>
  );
};

export default DragArea;
