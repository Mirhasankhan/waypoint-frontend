"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import Container from "@/utils/Container";
import Eyebrow from "./Eyebrow";
import { fadeUp, staggerContainer, viewportOnce } from "./motion";

const FinalCta = () => {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      {/* ambient glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(8,140,106,0.18),transparent_55%)]" />

      {/* faint concentric rings echoing the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {[520, 380, 240].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-white/5"
            style={{
              height: size,
              width: size,
              left: -size / 2,
              top: -size / 2,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 60 + i * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25"
          >
            <Compass className="h-7 w-7" />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Eyebrow align="center" tone="dark" className="mb-6">
              Start Here
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl"
          >
            Your next chapter starts with{" "}
            <span className="font-normal italic text-primary">clarity.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Take the assessment, read your report, and — if you want — bring it
            to an expert. The whole path is built to move you forward.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.a
              href="#assessments"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
            >
              Start Your Assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
            <a
              href="#assessments"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/40 hover:text-white"
            >
              Book a Consultation
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FinalCta;
