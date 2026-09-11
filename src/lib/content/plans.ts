export type PlanCard = {
  id: string;
  emoji: string;
  title: string;
  frequency: string;
  taskCount: number;
};

export const plans: PlanCard[] = [
  { id: "postpartum", emoji: "🌸", title: "Postpartum Recovery", frequency: "Daily", taskCount: 6 },
  { id: "chores", emoji: "🏡", title: "Family Chores", frequency: "Weekly", taskCount: 8 },
  { id: "meds", emoji: "💊", title: "Medication Schedule", frequency: "Daily", taskCount: 4 },
  { id: "baby", emoji: "👶", title: "Baby Care", frequency: "Daily", taskCount: 10 },
  { id: "recovery", emoji: "💪", title: "Injury Recovery", frequency: "Every 2 days", taskCount: 5 },
  { id: "onboarding", emoji: "🔑", title: "New Roommate Setup", frequency: "Only once", taskCount: 7 },
];
