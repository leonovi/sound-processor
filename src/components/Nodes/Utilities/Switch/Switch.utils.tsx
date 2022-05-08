import { HandleT } from 'components/Node/components/Handle/Handle.models';
import { TypeOfData } from 'components/Nodes/models';
import { generateId } from 'utils/generateId';

export const createSwitcher = (
  id: number,
  selected: boolean
) => ({
  id,
  selected,
});

export const createAdditionalInputKey = (id: number) =>
  `switchAdditionalInput${id + 1}`;

export const createAdditionalInput = (
  id: number
): HandleT => ({
  id: generateId('SWITCH_ADDITIONAL_INPUT'),
  dataType: TypeOfData.Any,
  hint: `Switch additional input #${id + 1} | any`,
});

export const createSwitchers = (
  qty: number,
  selectedId: number | null
) => {
  return new Array(qty)
    .fill(null)
    .map((_, id) => createSwitcher(id, id === selectedId));
};
