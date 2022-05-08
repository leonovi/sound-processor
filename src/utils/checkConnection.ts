import { TypeOfData } from 'components/Nodes/models';

const DATASET_TYPE_KEY = 'datatype';

const createHandleSelector = (id: string) => `[data-handleid=${id}]`;

const selectDataset = (handleId: string) =>
  document.querySelector<HTMLElement>(createHandleSelector(handleId))?.dataset;

export const checkConnection = (sourceHandle: string, targetHandle: string) => {
  const sourceDataType = selectDataset(sourceHandle)?.[
    DATASET_TYPE_KEY
  ] as TypeOfData;

  const targetDataType = selectDataset(targetHandle)?.[
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
