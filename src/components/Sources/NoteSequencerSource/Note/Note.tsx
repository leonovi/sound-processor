import React, {
  FC,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import b_ from 'b_';
import './Note.css';
import { MAX_OCTAVE, MIN_OCTAVE, NOTES } from '../NoteSequencerSource.models';
import { ARROW_UP } from 'utils/isArrowUp';
import { ARROW_DOWN } from 'utils/isArrowDown';
import { ARROW_LEFT } from 'utils/isArrowLeft';
import { ARROW_RIGHT } from 'utils/isArrowRight';
import { NoteProps } from './Note.models';

const extractNote = (note: string): string => note.slice(0, -1);
const extractOctave = (note: string): number => Number(note.slice(-1));

const b = b_.with('sequencer-note');

const Note: FC<NoteProps> = ({ id, note, isActive, onChange }) => {
  const noteRef = useRef<HTMLDivElement>(null);

  const [currentNote, setCurrentNote] = useState(extractNote(note));
  const [currentOctave, setCurrentOctave] = useState(extractOctave(note));

  const [isDisabled, setDisabled] = useState(false);
  const [isSettingsMode, setSettingsMode] = useState(false);

  const findNoteIndex = () => NOTES.findIndex((note) => note === currentNote);
  const currentNoteIndex = findNoteIndex();

  useEffect(() => {
    onChange(id, `${currentNote}${currentOctave}`);
  }, [currentNote, currentOctave]);

  useEffect(
    () => (isSettingsMode ? noteRef.current?.focus() : noteRef.current?.blur()),
    [isSettingsMode]
  );

  const keyDownActions = new Map([
    [
      ARROW_UP,
      () => {
        setCurrentOctave(
          currentOctave + 1 > MAX_OCTAVE ? MIN_OCTAVE : currentOctave + 1
        );
      },
    ],
    [
      ARROW_DOWN,
      () => {
        setCurrentOctave(
          currentOctave - 1 < MIN_OCTAVE ? MAX_OCTAVE : currentOctave - 1
        );
      },
    ],
    [
      ARROW_LEFT,
      () => {
        setCurrentNote(
          currentNoteIndex - 1 < 0
            ? NOTES[NOTES.length - 1]
            : NOTES[currentNoteIndex - 1]
        );
      },
    ],
    [
      ARROW_RIGHT,
      () => {
        setCurrentNote(
          currentNoteIndex + 1 > NOTES.length - 1
            ? NOTES[0]
            : NOTES[currentNoteIndex + 1]
        );
      },
    ],
  ]);

  return (
    <div className={b('container')}>
      <div
        ref={noteRef}
        tabIndex={0} // Hack for focused div
        className={b({
          active: isActive,
          disabled: isDisabled,
          'settings-mode': isSettingsMode,
        })}
        onClick={() => setSettingsMode((isSetup) => !isSetup)}
        onKeyDown={({ key }) => keyDownActions.get(key)?.()}
      >
        <span className={b('note')}>{note}</span>
      </div>

      <button
        className={b('button', { disabled: isDisabled })}
        onClick={() => setDisabled((isInactive) => !isInactive)}
      />
    </div>
  );
};

export { Note };
