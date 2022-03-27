import { useNodes } from "./useNodes"

const useNode = (id: string) => {
  return useNodes().find((node) => node.id === id);
}

export { useNode };
