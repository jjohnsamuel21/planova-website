export type UseCase = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

export const useCases: UseCase[] = [
  {
    id: "postpartum",
    emoji: "🤱",
    title: "Postpartum recovery",
    description:
      "Track medication, rest, and recovery steps together, so both parents can see what's been done today.",
  },
  {
    id: "family-chores",
    emoji: "🏡",
    title: "Family chores",
    description:
      "Split up household responsibilities and see who's on top of what, without the group-chat back-and-forth.",
  },
  {
    id: "caregivers",
    emoji: "💊",
    title: "Caregivers",
    description:
      "Keep medication and care routines on schedule for a loved one, with reminders and a clear daily log.",
  },
  {
    id: "roommates",
    emoji: "🔑",
    title: "Roommates",
    description:
      "Coordinate shared routines — cleaning, meal prep, plants — with a lightweight shared plan everyone can check.",
  },
];
