export type ReminderEvent = {
  id: string;
  title: string;
  tag: string;
  date: string;
  notifyBefore: string;
};

export const reminders: ReminderEvent[] = [
  { id: "cert", title: "Baby's birth certificate", tag: "Baby", date: "Aug 29", notifyBefore: "3 days daily before" },
  { id: "vax", title: "6-month vaccination", tag: "Vaccination", date: "Sep 14", notifyBefore: "1 day before" },
  { id: "checkup", title: "Postpartum checkup", tag: "Health", date: "Sep 20", notifyBefore: "2 days before" },
];
