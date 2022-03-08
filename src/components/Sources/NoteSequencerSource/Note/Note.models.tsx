export type NoteProps = {
  id: number;
  note: string;
  isActive: boolean;
  onChange: (id: number, note: string) => void;
}
