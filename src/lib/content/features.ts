import type { CategoryColor } from "@/lib/theme/tokens";

export type Feature = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  categoryColor: CategoryColor;
};

export const features: Feature[] = [
  {
    id: "plans",
    emoji: "🌸",
    title: "Plans",
    description:
      "Create recurring routines for anything — postpartum recovery, chores, exercise — and choose how often they repeat: daily, weekly, or on your own schedule.",
    categoryColor: "purple",
  },
  {
    id: "thread-dial",
    emoji: "💬",
    title: "Thread & Dial views",
    description:
      "Log tasks your way: Thread is a calm, chat-style feed of today's tasks. Dial is a dense list with a live progress ring. Switch anytime.",
    categoryColor: "blue",
  },
  {
    id: "dashboard",
    emoji: "📊",
    title: "Dashboard & streaks",
    description:
      "See completion by category, day streaks, and a 7-day average at a glance — plus a day-by-day history you can tap back through.",
    categoryColor: "green",
  },
  {
    id: "roles",
    emoji: "👨‍👩‍👧",
    title: "Roles & invites",
    description:
      "Invite family by email as an Executor who logs tasks, or an Observer who just follows along — everyone sees the same shared picture.",
    categoryColor: "orange",
  },
];
