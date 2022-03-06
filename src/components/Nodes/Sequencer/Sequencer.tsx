import { InputController } from 'components/Controllers/InputController/InputController';
import { Node } from 'components/Node/Node';
import React, { FC, useEffect, useState } from 'react';
import { NodeProps, useUpdateNodeInternals } from 'react-flow-renderer';
import { NodeData } from '../Nodes';
// @ts-ignore
import noteToFrequency from 'note-to-frequency';

const Sequencer: FC<NodeProps<NodeData & { value: number }>> = ({ id, data }) => {
  const updateNode = useUpdateNodeInternals();

  const SequencerButtons = [
    {
      id: 1,
      note: 'C2',
    },
    {
      id: 2,
      note: 'D2',
    },
    {
      id: 3,
      note: 'D3',
    },
    {
      id: 4,
      note: 'E2',
    },
    {
      id: 5,
      note: 'D3',
    },
    {
      id: 6,
      note: 'C2',
    },
    {
      id: 7,
      note: 'A2',
    },
    {
      id: 8,
      note: 'D2',
    },
  ]

  const [BPM, setBPM] = useState(120);

  const [currentNoteId, setCurrentNoteId] = useState(1);
  useEffect(() => {
    const nextNote = async () => {
      setTimeout(() => {
        setCurrentNoteId((id) => {
          const nextId = id + 1;
          if (nextId > SequencerButtons.length) {
            return SequencerButtons[0].id;
          } else {
            return nextId;
          }
        })
      }, (60 / BPM) * 1000);
    }

    nextNote();
  }, [currentNoteId]);

  useEffect(() => {
    const b = SequencerButtons.find(({ id }) => id === currentNoteId);
    setValue(noteToFrequency(b?.note));
  }, [currentNoteId]);

  const [value, setValue] = useState(noteToFrequency(SequencerButtons[0].note));

  useEffect(() => {
    data.value = value;
    updateNode(id);
  }, [value]);

  return (
    <Node label='Sequencer' outputs={[{ id: '5555', label: 'Output' }]}>
      <InputController
        value={BPM}
        minValue={20}
        maxValue={1000}
        onChange={(bpm) => setBPM(bpm)}
      />
      {SequencerButtons.map((data) => (
        <span>{data.note}</span>
      ))}
    </Node>
  )
};

export { Sequencer };
