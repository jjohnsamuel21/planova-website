"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { familyMembers, type FamilyMember } from "@/lib/content/family";
import { VIEWPORT } from "@/lib/motion";

const roleColor: Record<FamilyMember["role"], string> = {
  Owner: "text-glow-amber bg-glow-amber/15",
  Executor: "text-glow-purple-text bg-glow-purple/15",
  Observer: "text-sub-hud bg-void-border/40",
};

export function Family() {
  const [invited, setInvited] = useState(false);

  return (
    <section id="family" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            06 · Family &amp; roles
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            Everyone sees the same picture.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Invite family by email. Executors log tasks, Observers just
            follow along — the owner decides who does what, and everyone
            shares one dashboard.
          </p>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-14 max-w-xl rounded-card-lg border border-void-border bg-void-elevated p-6"
        >
          <div className="space-y-3">
            {familyMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between rounded-chip bg-void/60 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-glow-amber font-mono text-sm font-bold text-void">
                    {member.initial}
                  </span>
                  <span className="text-sm font-bold text-ink-hud">
                    {member.name}
                  </span>
                </div>
                <span
                  className={`rounded-chip px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${roleColor[member.role]}`}
                >
                  {member.role}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 border-t border-void-border pt-5">
            {invited ? (
              <p className="font-mono text-sm font-bold text-glow-amber">
                ✓ Invite sent
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setInvited(true)}
                className="w-full rounded-chip border border-dashed border-void-border py-3 text-sm font-bold text-sub-hud transition-colors hover:border-glow-amber/50 hover:text-glow-amber"
              >
                + Invite family member
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
