import { useEffect } from 'react';
import { useEdges, useNodes, useReactFlow, useStoreApi } from 'react-flow-renderer';
import { getEdge } from 'utils/getEdge';
import { getNode } from 'utils/getNode';
import { isUndefined } from 'utils/isUndefined';
import { FlowNodeT } from 'components/Flow/Flow.models';

export const useConnection = (
  inputId: string,
  callback: (value: any) => void
) => {
  const nodes = useNodes() as Array<FlowNodeT>;
  const edges = useEdges();

  const connectedEdge = getEdge(edges, inputId);
  const connectedNode = getNode(
    nodes,
    connectedEdge?.source
  );

  useEffect(() => {
    if (isUndefined(connectedNode)) {
      return;
    }

    const { data } = connectedNode;
    callback(data.value);
  }, [connectedNode?.id]);
};

export const useConnection2 = (
  inputId: string,
  callback: (value: any) => void
) => {
  const { getState } = useStoreApi()
  const nodes = useNodes();


  // const connectedEdge = getEdge(, inputId);
  // const connectedNode = getNode(
  //   ,
  //   connectedEdge?.source
  // );

  // useEffect(() => {
  //   if (isUndefined(connectedNode)) {
  //     return;
  //   }

  //   const { data } = connectedNode;
  //   callback(data.value);
  // }, [connectedNode?.data.value]);
};
