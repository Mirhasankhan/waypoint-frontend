"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Container from "@/utils/Container";
import Eyebrow from "./Eyebrow";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "./motion";

const includes = [
  "A single readiness score, benchmarked against thousands of real outcomes.",
  "Your top strengths and the specific gaps holding you back right now.",
  "One prioritized next step, clear enough to act on today.",
];

const strengths = ["Systems thinking", "Resilience", "Decisiveness"];
const gaps = ["Network depth", "Runway planning"];

/** Counts from 0 → `to` once the element scrolls into view. */
const CountUp = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const RADIUS = 44;
const CIRC = 2 * Math.PI * RADIUS;
const SCORE = 87;

const ReportPreview = () => {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <Eyebrow className="mb-5">The Report</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl"
            >
              See the shape of your decision before you make it
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-base leading-relaxed text-ink/60"
            >
              Your report translates a few thoughtful minutes into a clear,
              honest picture — the kind you can actually build a plan around.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-8 space-y-4">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink/70">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.a
              variants={fadeUp}
              href="#assessments"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ink/20 transition-colors hover:bg-ink-800"
            >
              Generate your report
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>

          {/* Right: report card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={scaleIn}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[28px] bg-ink p-8 shadow-2xl shadow-ink/30 ring-1 ring-white/10">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/70">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Readiness Report
                  </span>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70">
                  Career Path Finder
                </span>
              </div>

              {/* Gauge */}
              <div className="relative mx-auto mt-8 flex h-44 w-44 items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke="#088c6a"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    initial={{ strokeDashoffset: CIRC }}
                    whileInView={{ strokeDashoffset: CIRC * (1 - SCORE / 100) }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ filter: "drop-shadow(0 0 6px rgba(8,140,106,0.6))" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl font-semibold text-white">
                    <CountUp to={SCORE} />
                  </span>
                  <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-primary">
                    Strategic Architect
                  </span>
                </div>
              </div>

              {/* Strengths / gaps */}
              <div className="relative mt-8 grid grid-cols-2 gap-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    Strengths
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {strengths.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    Gaps to close
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {gaps.map((g) => (
                      <span
                        key={g}
                        className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next step */}
              <div className="relative mt-7 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    Your next step
                  </p>
                  <p className="mt-0.5 text-sm text-white/85">
                    Run three informational interviews this month.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ReportPreview;
