import { NoteOption } from "components/Sources/NoteSequencerSource/NoteSequencerSource.models";

const findNote = (notes: Array<NoteOption>, id: number): NoteOption => {
  return notes.find((note) => note.id === id) as NoteOption;
};

export { findNote };
