export type LogEntry = {
  id: string;
  emoji: string;
  label: string;
  time: string;
  detail?: string;
};

export const logActivities: LogEntry[] = [
  { id: "feed", emoji: "🍼", label: "Feed", time: "10:00 AM", detail: "30 min" },
  { id: "sleep", emoji: "😴", label: "Sleep", time: "11:00 AM", detail: "3 hr" },
  { id: "urine", emoji: "💧", label: "Urine", time: "1:30 AM", detail: "1st time" },
  { id: "poop", emoji: "🧷", label: "Poop", time: "2:00 AM", detail: "1st time" },
  { id: "cry", emoji: "😢", label: "Cry", time: "3:00 AM", detail: "After feed" },
];

export const quickChips = ["Feed", "Sleep", "Urine", "Poop", "Cry", "Play"];
