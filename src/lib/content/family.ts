export type FamilyMember = {
  id: string;
  initial: string;
  name: string;
  role: "Owner" | "Executor" | "Observer";
};

export const familyMembers: FamilyMember[] = [
  { id: "you", initial: "J", name: "You", role: "Owner" },
  { id: "partner", initial: "A", name: "Alex", role: "Executor" },
  { id: "grandma", initial: "M", name: "Mom", role: "Observer" },
];
