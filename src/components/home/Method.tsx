"use client";

import { motion } from "framer-motion";
import { Cpu, FileText, MessagesSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/utils/Container";
import Eyebrow from "./Eyebrow";
import { fadeUp, staggerContainer, viewportOnce } from "./motion";

type Step = {
  icon: LucideIcon;
  index: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: MessagesSquare,
    index: "01",
    title: "Answer adaptive questions",
    description:
      "Respond to questions that adjust in real time to how you think — no two paths through the assessment are ever alike.",
  },
  {
    icon: Cpu,
    index: "02",
    title: "AI analyzes your full profile",
    description:
      "Our model weighs your answers against thousands of real outcomes, finding the signal beneath your instincts and second-guesses.",
  },
  {
    icon: FileText,
    index: "03",
    title: "Get a personalized report",
    description:
      "Receive a clear readiness score, a map of your strengths and gaps, and the single most important next move to make.",
  },
];

const Method = () => {
  return (
    <section id="method" className="bg-cream-100 py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow align="center" className="mb-5">
              The Axon Method
            </Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl"
          >
            Clarity, in three deliberate moves
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-relaxed text-ink/60"
          >
            No endless questionnaires or vague horoscopes. Just a focused path
            from where you are to what you should do next.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {/* connecting hairline across steps (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent md:block"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.index}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="relative">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink text-primary shadow-lg shadow-ink/20">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="absolute -right-2 -top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow-md">
                    {step.index}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60 md:max-w-none">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default Method;
