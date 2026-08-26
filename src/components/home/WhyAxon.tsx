"use client";

import { motion } from "framer-motion";
import { Shuffle, Sparkles, Target, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/utils/Container";
import Eyebrow from "./Eyebrow";
import { fadeUp, fromRight, staggerContainer, viewportOnce } from "./motion";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Shuffle,
    title: "Adaptive, not static",
    description:
      "Every question reshapes the next. The assessment follows your reasoning instead of forcing you down a fixed script.",
  },
  {
    icon: Sparkles,
    title: "AI-powered insight",
    description:
      "A model trained on thousands of real decisions surfaces the patterns your gut can feel but can't quite name.",
  },
  {
    icon: Target,
    title: "Actionable, not just a score",
    description:
      "You leave with a concrete next move — not a number to interpret and a tab to close five minutes later.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first by design",
    description:
      "Your answers are yours. We never sell your data, and you can delete your profile in a single click, anytime.",
  },
];

const WhyAxon = () => {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow className="mb-5">Why Axon</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl"
            >
              Built like a thinking partner, not a quiz
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-base leading-relaxed text-ink/60"
            >
              Most online tests hand you a label and leave. Axon is built to
              actually move your decision forward — with the rigor of an advisor
              and the patience of a good conversation.
            </motion.p>
          </motion.div>

          {/* Right: 2x2 matrix — 1px gaps over an ink background render the grid lines */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fromRight}
                  className="group relative bg-white p-8 transition-colors hover:bg-cream-100"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-medium text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WhyAxon;
