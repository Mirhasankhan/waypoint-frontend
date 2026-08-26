"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Container from "@/utils/Container";
import Eyebrow from "./Eyebrow";
import { fadeUp, staggerContainer, viewportOnce } from "./motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  score: number;
  archetype: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I'd been circling the same career decision for two years. Forty minutes with Axon gave me more clarity than a dozen conversations with friends who just told me what I wanted to hear.",
    name: "Maya R.",
    role: "Product Designer → Founder",
    score: 92,
    archetype: "Strategic Architect",
  },
  {
    quote:
      "The report didn't flatter me. It showed me exactly where I wasn't ready to move abroad yet — and what to fix first. That honesty is the whole point.",
    name: "Daniel K.",
    role: "Considering Study Abroad",
    score: 84,
    archetype: "Deliberate Explorer",
  },
  {
    quote:
      "It felt less like a quiz and more like a sharp mentor asking the right questions. I finally made the switch I'd been avoiding, and it stuck.",
    name: "Priya S.",
    role: "Career Changer, now in Data",
    score: 78,
    archetype: "Grounded Pragmatist",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-cream-100 py-20 md:py-28">
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
              Field Notes
            </Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl"
          >
            People who stopped guessing
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2"
          >
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="text-sm font-semibold text-ink">4.9/5</span>
            <span className="text-sm text-ink/50">average clarity rating</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-7 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {t.score} · {t.archetype}
                </span>
              </div>
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-ink/70">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-ink/8 pt-4">
                <p className="font-display text-base font-medium text-ink">
                  {t.name}
                </p>
                <p className="mt-0.5 text-xs text-ink/50">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
