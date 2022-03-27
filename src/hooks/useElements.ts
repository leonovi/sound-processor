import { Elements } from "react-flow-renderer";
import { useEdges } from "./useEdges";
import { useNodes } from "./useNodes";

const useElements = () => {
  const nodes = useNodes();
  const edges = useEdges();
  return [nodes, edges].flat() as Elements;
};

export { useElements };
