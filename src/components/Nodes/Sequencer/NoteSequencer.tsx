import { InputController } from 'components/Controllers/InputController/InputController';
import { Node } from 'components/Node/Node';
import React, { FC, useEffect, useState } from 'react';
import { NodeProps, useUpdateNodeInternals } from 'react-flow-renderer';
import { NodeData } from '../Nodes';
// @ts-ignore
import noteToFrequency from 'note-to-frequency';
import { DEFAULT_BPM, DEFAULT_SEQUENCER_LENGTH, NOTE_SEQUENCER_OUTPUTS } from './NoteSequencer.models';
import { first } from 'utils/first';
import { Note } from './Note/Note';
import { useInputs } from 'hooks/useInputs';
import { useSetters } from 'hooks/useSetters';

const NoteSequencer: FC<NodeProps<NodeData & { value: number }>> = ({
  id,
  data,
}) => {
  const updateNode = useUpdateNodeInternals();

  const [BPM, setBPM] = useState(DEFAULT_BPM);
  const [notes, setNotes] = useState(
    Array(DEFAULT_SEQUENCER_LENGTH)
      .fill(null)
      .map((_, index) => ({ id: index, note: 'C4' }))
  );
  const [value, setValue] = useState(noteToFrequency(first(notes).note));
  const [currentNoteId, setCurrentNoteId] = useState(0);

  useEffect(() => {
    const nextNote = async () => {
      setTimeout(() => {
        setCurrentNoteId((id) => {
          const nextId = id + 1;
          if (nextId > notes.length - 1) {
            return first(notes).id;
          } else {
            return nextId;
          }
        });
      }, (60 / BPM) * 1000);
    };

    nextNote();
  }, [currentNoteId]);

  useEffect(() => {
    const b = notes.find(({ id }) => id === currentNoteId);
    setValue(noteToFrequency(b?.note));
  }, [currentNoteId]);

  useEffect(() => {
    data.value = value;
    updateNode(id);
  }, [value]);

  return (
    <Node
      label="Sequencer"
      outputs={NOTE_SEQUENCER_OUTPUTS}
    >
      <InputController
        value={BPM}
        minValue={20}
        maxValue={1000}
        onChange={(bpm) => setBPM(bpm)}
      />
      {notes.map(({ id, note }) => (
        <Note
          id={id}
          note={note}
          isActive={id === currentNoteId}
          onChange={(id, note) => {
            const currentNote = notes.find((note) => note.id === id);
            if (currentNote) {
              const newNote = {
                ...currentNote,
                note,
              };
              notes[id] = newNote;
              setNotes(notes);
            }
          }}
        />
      ))}
    </Node>
  );
};

export { NoteSequencer };
