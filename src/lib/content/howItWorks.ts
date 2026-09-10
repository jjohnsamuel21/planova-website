export type Step = {
  step: number;
  title: string;
  description: string;
};

export const howItWorks: Step[] = [
  {
    step: 1,
    title: "Create a plan",
    description:
      "Give it a name, an emoji, and a frequency — daily, every few days, or once.",
  },
  {
    step: 2,
    title: "Add tasks",
    description:
      "Break the plan into categorized tasks, with an optional scheduled time and reminder.",
  },
  {
    step: 3,
    title: "Log daily",
    description:
      "Check tasks off in Thread or Dial view as you go — today, or catch up on a past date.",
  },
  {
    step: 4,
    title: "Track progress",
    description:
      "Watch streaks build and completion rates climb on the shared dashboard.",
  },
];
