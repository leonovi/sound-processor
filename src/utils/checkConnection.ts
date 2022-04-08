import { TypeOfData } from 'components/Nodes/models';

const DATASET_TYPE_KEY = 'datatype';

const createHandleSelector = (id: string) => `[data-handleid=${id}]`;

const getHandleDataset = (handleId: string) =>
  document.querySelector<HTMLElement>(createHandleSelector(handleId))?.dataset;

const checkConnection = (sourceHandle: string, targetHandle: string) => {
  const sourceDataType = getHandleDataset(sourceHandle)?.[
    DATASET_TYPE_KEY
  ] as TypeOfData;

  const targetDataType = getHandleDataset(targetHandle)?.[
    DATASET_TYPE_KEY
  ] as TypeOfData;

  const isValid =
    sourceDataType === TypeOfData.Any ||
    targetDataType === TypeOfData.Any ||
    sourceDataType === targetDataType;

  return {
    isValid,
    sourceDataType,
    targetDataType,
  };
};

export { checkConnection };
