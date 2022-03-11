import { InputController } from 'components/Controllers/InputController/InputController';
import { Node } from 'components/Node/Node';
import React, { FC, useEffect, useState } from 'react';
import { NodeProps, useUpdateNodeInternals } from 'react-flow-renderer';
// @ts-ignore
import noteToFrequency from 'note-to-frequency';
import {
  DEFAULT_BPM,
  DEFAULT_NOTES,
  DEFAULT_VALUE,
  FIRST_NOTE_ID,
  MAX_ID,
  NOTE_SEQUENCER_CHANNELS,
  NOTE_SEQUENCER_OUTPUT,
} from './NoteSequencerSource.models';
import { Note } from './Note/Note';
import { Source } from 'components/Flow/Flow.models';
import { bpmToMs } from 'utils/bpmToMs';
import { findNote } from 'utils/findNote';

import b_ from 'b_';
import './NoteSequencerSource.css';
import { NO_LABEL } from 'components/Node/Parameters/Parameter/Parameter.models';
import { useInputs } from 'hooks/useInputs';
import { isUndefined } from 'utils/isUndefined';

const b = b_.with('note-sequencer-source');

const NoteSequencerSource: FC<NodeProps<Source<number>>> = ({ id, data }) => {
  const updateNode = useUpdateNodeInternals();

  const inputs = useInputs(id);
  const startedInputNode = inputs.get(NOTE_SEQUENCER_CHANNELS.SYNC.id);

  useEffect(() => {
    if (isUndefined(startedInputNode)) {
      return;
    }

    setStarted(startedInputNode.data.value);
  }, [startedInputNode]);

  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const [value, setValue] = useState(DEFAULT_VALUE);

  const [currentNoteId, setCurrentNoteId] = useState(FIRST_NOTE_ID);

  const [isStarted, setStarted] = useState(false);
  useEffect(() => {
    if (!isStarted) {
      setCurrentNoteId(FIRST_NOTE_ID);
      return;
    }

    setTimeout(() => {
      setCurrentNoteId((id) => (id + 1 > MAX_ID ? FIRST_NOTE_ID : id + 1));
    }, bpmToMs(bpm));
  }, [isStarted, currentNoteId]);

  useEffect(() => {
    setValue(noteToFrequency(findNote(notes, currentNoteId).note));
  }, [notes, currentNoteId]);

  useEffect(() => {
    data.value = value;
    updateNode(id);
  }, [value]);

  return (
    <Node
      label="Sequencer"
      output={NOTE_SEQUENCER_OUTPUT}
      parameters={[
        {
          label: NO_LABEL,
          controller: (
            <button onClick={() => setStarted(isStarted ? false : true)}>
              {isStarted ? 'Stop' : 'Start'}
            </button>
          ),
          channel: NOTE_SEQUENCER_CHANNELS.SYNC,
        },
        {
          label: 'Bpm',
          controller: (
            <InputController
              value={bpm}
              minValue={20}
              maxValue={1000}
              onChange={(bpm) => setBpm(bpm)}
            />
          ),
          channel: NOTE_SEQUENCER_CHANNELS.BPM,
        },
      ]}
    >
      <div className={b('notes')}>
        {notes.map(({ id, note }) => (
          <Note
            key={id}
            id={id}
            note={note}
            isActive={id === currentNoteId}
            onChange={(changedNoteId, changedNote) => {
              setNotes((notes) =>
                notes.map(({ id, note }) => ({
                  id,
                  note: id === changedNoteId ? changedNote : note,
                }))
              );
            }}
          />
        ))}
      </div>
    </Node>
  );
};

export { NoteSequencerSource };
