"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Compass, Plane, Repeat, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/utils/Container";
import Eyebrow from "./Eyebrow";
import { fadeUp, staggerContainer, viewportOnce } from "./motion";

type Assessment = {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
};

const assessments: Assessment[] = [
  {
    icon: Compass,
    title: "Career Path Finder",
    description:
      "Map the roles that fit how you actually think, decide, and work.",
    time: "15–20 min",
  },
  {
    icon: Rocket,
    title: "Startup Founder Readiness",
    description:
      "Gauge your tolerance for risk, ambiguity, and building from zero.",
    time: "20–25 min",
  },
  {
    icon: Plane,
    title: "Study Abroad Fit",
    description:
      "Weigh academic, cultural, and financial readiness for life overseas.",
    time: "15–18 min",
  },
  {
    icon: Repeat,
    title: "Career Change Readiness",
    description:
      "Test whether switching lanes now is a leap forward — or a stumble.",
    time: "18–22 min",
  },
];

const AssessmentMatrix = () => {
  return (
    <section id="assessments" className="bg-cream py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <motion.div variants={fadeUp}>
              <Eyebrow className="mb-5">The Assessment Matrix</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl"
            >
              Choose your line of inquiry
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-base leading-relaxed text-ink/60"
            >
              Four guided assessments, each engineered to surface the readiness
              you can&apos;t feel through gut instinct alone.
            </motion.p>
          </div>
          <motion.a
            variants={fadeUp}
            href="#method"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-primary"
          >
            How they work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {assessments.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.title}
                href="#assessments"
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 shadow-sm transition-shadow hover:border-primary/30 hover:shadow-xl hover:shadow-ink/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">
                  {item.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink/45">
                    <Clock className="h-3.5 w-3.5" />
                    {item.time}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Start
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default AssessmentMatrix;
