"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, Play, Star } from "lucide-react";
import Container from "@/utils/Container";
import Eyebrow from "./Eyebrow";
import { fadeUp, staggerContainer, scaleIn } from "./motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Ambient brand glow, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[1px] bg-gradient-to-b from-transparent via-ink/10 to-transparent"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Left: copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-xl"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow className="mb-6">
                <span className="inline-flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" />
                  The Cartography of Clarity
                </span>
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[2.7rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.75rem]"
            >
              Find Clarity
              <br />
              Before You{" "}
              <span className="font-normal italic text-primary">Leap.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-relaxed text-ink/60 sm:text-lg"
            >
              Axon Pathways turns life&apos;s biggest forks in the road into a
              guided, evidence-based assessment — helping you measure your true
              readiness for career shifts, founding a startup, studying abroad,
              and every decision that actually matters.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="/assessment"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
              >
                Start Your Assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
              <a
                href="#method"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:text-primary"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                See How It Works
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-ink">4.8/5</span>
                <span className="text-ink/50">from 1,243+ reviews</span>
              </div>
              <span className="hidden h-4 w-px bg-ink/15 sm:block" />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg font-semibold text-ink">
                  10,240
                </span>
                <span className="text-ink/50">lives reoriented</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: visual */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={scaleIn}
            className="relative mx-auto w-full max-w-md lg:mr-0"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

/** Abstract "readiness constellation" — a dark card with layered glow + rings. */
const HeroVisual = () => {
  return (
    <div className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-ink shadow-2xl shadow-ink/30 ring-1 ring-white/10">
        {/* glows */}
        <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(255,255,255,0.08),transparent_55%)]" />

        {/* concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[260, 200, 140, 82].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-white/10"
              style={{ height: size, width: size }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 40 + i * 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span
                className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary"
                style={{ boxShadow: "0 0 12px 2px rgba(8,140,106,0.8)" }}
              />
            </motion.div>
          ))}
          {/* core */}
          <motion.div
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 40px 6px rgba(8,140,106,0.45)" }}
          >
            <Compass className="h-8 w-8 text-white" />
          </motion.div>
        </div>

        {/* caption inside card */}
        <div className="absolute inset-x-6 bottom-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">
            Decision Mapping
          </p>
          <p className="mt-1 text-sm text-white/70">
            Every answer moves a point on your readiness map.
          </p>
        </div>
      </div>

      {/* floating pill: quiz progress */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 top-8 rounded-2xl border border-ink/5 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur"
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-ink/40">
          Readiness Quiz
        </p>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full w-[60%] rounded-full bg-primary" />
          </div>
          <span className="text-xs font-semibold text-ink">12/20</span>
        </div>
      </motion.div>

      {/* floating card: score */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-ink/5 bg-white/95 px-4 py-3 shadow-xl backdrop-blur"
      >
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
          <span className="text-sm font-bold text-primary">87</span>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-ink/40">
            Readiness Score
          </p>
          <p className="text-sm font-semibold text-ink">Strategic Architect</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
