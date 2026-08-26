"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, ShieldCheck, Star, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/utils/Container";
import Eyebrow from "./Eyebrow";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "./motion";
import lawyer from "@/assets/lawyer.jpg";

type BookingStep = { icon: LucideIcon; index: string; label: string };

const bookingSteps: BookingStep[] = [
  { icon: CalendarClock, index: "01", label: "Pick a time" },
  { icon: ShieldCheck, index: "02", label: "Pay securely" },
  { icon: Video, index: "03", label: "Meet on Zoom" },
];

const Consultation = () => {
  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={scaleIn}
          className="relative overflow-hidden rounded-[32px] bg-ink px-7 py-12 shadow-2xl shadow-ink/30 ring-1 ring-white/10 md:px-14 md:py-16"
        >
          {/* ambient glows */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: copy + steps */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow tone="dark" className="mb-5">
                  1:1 Guidance
                </Eyebrow>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl"
              >
                Want to go deeper?{" "}
                <span className="font-normal italic text-primary">
                  Talk to an expert.
                </span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-md text-base leading-relaxed text-white/60"
              >
                Bring your report to a real strategist and turn insight into a
                plan. Booking takes under a minute.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-4 sm:flex-row sm:gap-8"
              >
                {bookingSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.index} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold text-primary">
                          {step.index}
                        </p>
                        <p className="text-sm font-medium text-white/90">
                          {step.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              <motion.a
                variants={fadeUp}
                href="#assessments"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </motion.div>

            {/* Right: expert card */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15">
                    <Image
                      src={lawyer}
                      alt="Dr. Elena Marsh"
                      fill
                      sizes="64px"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium text-white">
                      Dr. Elena Marsh
                    </p>
                    <p className="text-sm text-white/55">
                      Senior Career Strategist
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="flex text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </span>
                      <span className="text-xs text-white/50">4.9</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70">
                    12+ yrs advising
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70">
                    1,400+ sessions
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-5">
                  <div>
                    <span className="font-display text-2xl font-semibold text-white">
                      $49
                    </span>
                    <span className="ml-1 text-sm text-white/50">
                      / 45-min session
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Available this week
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Consultation;
