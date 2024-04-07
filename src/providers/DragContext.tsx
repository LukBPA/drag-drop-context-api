import { PropsWithChildren, createContext, useContext, useState } from "react";

interface Props {
  data: any[];
  draggedItem: any;
  draggedOverItem: any;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDragEnd: () => void;
  onItemRelocate: (data: any[]) => void;
  setInitialData: (data: any[]) => void;
}

const DragContext = createContext<Props | undefined>(undefined);

export const useDragContext = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within a FormProvider");
  }
  return context;
};

export const DragProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [draggedOverItem, setDraggedOver] = useState<any>(null);

  const onDragStart = (index: number) => {
    setDraggedItem(data[index]);
  };

  const onDragEnd = () => {
    setDraggedOver(null);
    setDraggedItem(null);

    // if (draggedItem === draggedOverItem) {
    //   return;
    // }

    // const newData = data.filter((item) => item !== draggedItem);
    // const draggedOverIndex = newData.indexOf(draggedOverItem);
    // newData.splice(draggedOverIndex, 0, draggedItem);

    // onItemRelocate(newData);
  };

  const onDragOver = (index: number) => {
    const item = data[index];

    if (draggedItem === item) {
      setDraggedOver(null);
      return;
    }

    const newItems = [...data];
    newItems.splice(data.indexOf(draggedItem), 1);
    newItems.splice(index, 0, draggedItem);

    setData(newItems);
    setDraggedItem(newItems[newItems.indexOf(draggedItem)]);
  };

  const onItemRelocate = (data: any[]) => {
    setData(data);
  };

  const setInitialData = (data: any[]) => {
    setData(data);
  };

  return (
    <DragContext.Provider
      value={{
        data,
        draggedItem,
        draggedOverItem,
        onDragStart,
        onDragEnd,
        onDragOver,
        onItemRelocate,
        setInitialData,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};
