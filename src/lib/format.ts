export const formatNoteDate = (date?: Date) =>
  date
    ? date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

export const percent = (part: number, whole: number) =>
  whole > 0 ? Math.round((part / whole) * 100) : 0;
