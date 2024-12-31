import React, {useState, useRef, useEffect} from 'react';
import { useDrawer } from '../../context/DrawerContext';
import { useGraphs } from '../../context/GraphsContext';
import { NodeForm } from './NodeForm';
import { EdgeForm } from './EdgeForm';
import { CircleDot, CircleMinus, Minus } from 'lucide-react';

import { EllipsisVertical } from 'lucide-react';

export const GraphDots: React.FC = ({ graph }) => {
   const { openDrawer, closeDrawer } = useDrawer();
   const { updateGraph } = useGraphs();
   const [isVisible, setIsVisible] = useState(false);
   const graphDotsRef = useRef<HTMLDivElement>(null);

   const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleNodeNewClick = () => {
    openDrawer(
      `New Node`,
      <NodeForm
        onCreate={(created) => {
            // Yeni nodeId'yi belirle
            const nextNodeId = Math.max(...graph.nodes.map(n => Number(n.nodeId))) + 1;

            // Yeni node'u oluştur
            const newNode = { ...created, nodeId: String(nextNodeId) };

            // Yeni node'u array'e ekle
            const updatedNodes = [...graph.nodes, newNode];

            // graph objesini güncelle
            updateGraph({ ...graph, nodes: updatedNodes });
        }}
        onClose={() => closeDrawer()}
      />
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        graphDotsRef.current &&
        !graphDotsRef.current.contains(event.target as Node)
      ) {
        // Eğer tıklanan yer graphDotsRef'in dışındaysa
        setIsVisible(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Eğer Escape tuşuna basıldıysa
        setIsVisible(false);
      }
    };

    // Olay dinleyicilerini ekle
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Temizlik işlemi: bileşen unmount olduğunda dinleyicileri kaldır
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="z-100 fixed top-4 right-2" ref={graphDotsRef}>
      {/* İkona tıklanıldığında görünürlük değişir */}
      <div className="relative">
        <EllipsisVertical
          className="h-6 w-6 cursor-pointer"
          onClick={toggleVisibility}
        />
        {/* Div'in görünürlüğü isVisible durumuna bağlı */}
        {isVisible && (
          <div
            className="absolute right-0 mt-2 bg-fountainblue-500 text-gray-300 text-sm p-2 rounded-md shadow-md"
            style={{ minWidth: "120px" }} // Genişlik sabitlenebilir
          >
            <ul>
              <li
                onClick={handleNodeNewClick}
                className="cursor-pointer hover:bg-gray-400 p-1 rounded"
              >
                <CircleDot size={16} className='inline' /> New Node
              </li>
              <li
                onClick={handleNodeNewClick}
                className="cursor-pointer hover:bg-gray-400 p-1 rounded"
              >
                <CircleMinus size={16} className='inline' /> New Edge
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};