import React, { FC, useEffect, useState } from 'react';

import b_ from 'b_';
import './Note.css';
import { NOTES } from '../NoteSequencer.models';

const b = b_.with('sequencer-note');

const Note: FC<{
  id: number;
  note: string;
  onChange: (id: number, note: string) => void;
  isActive: boolean;
}> = ({ id, note, onChange, isActive }) => {
  const [currentNote, setCurrentNote] = useState(note.slice(0, -1));
  const [currentOctave, setCurrentOctave] = useState(note.slice(-1));

  useEffect(() => {
    onChange(id, `${currentNote}${currentOctave}`);
  }, [currentNote, currentOctave]);

  return (
    <div className={b()}>
      <button
        className={b('note-inc')}
        onClick={() => {
          const currentNoteIndex = NOTES.findIndex(
            (note) => note === currentNote
          );
          setCurrentNote(NOTES[currentNoteIndex - 1]);
        }}
      >
        -
      </button>
      <div className={b('wrapper')}>
        <button
          className={b('octave-dec')}
          onClick={() => {
            setCurrentOctave(`${Number(currentOctave) + 1}`);
          }}
        >
          +
        </button>
        <span className={b('note', { active: isActive })}>{note}</span>
        <button
          className={b('octave-inc')}
          onClick={() => {
            setCurrentOctave(`${Number(currentOctave) - 1}`);
          }}
        >
          -
        </button>
      </div>
      <button
        className={b('note-dec')}
        onClick={() => {
          const currentNoteIndex = NOTES.findIndex(
            (note) => note === currentNote
          );
          setCurrentNote(NOTES[currentNoteIndex + 1]);
        }}
      >
        +
      </button>
    </div>
  );
};

export { Note };
