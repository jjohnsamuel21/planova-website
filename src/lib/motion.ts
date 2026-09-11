// Shared viewport options for whileInView / useInView animations, so
// content across every chapter assembles at a consistent point in the
// scroll — ~20% into the viewport, per the design spec.
export const VIEWPORT = { once: true, margin: "-20% 0px" } as const;
