"use client";

import { MotionConfig } from "framer-motion";
import Hero from "@/components/home/Hero";
import AssessmentMatrix from "@/components/home/AssessmentMatrix";
import Method from "@/components/home/Method";
import WhyAxon from "@/components/home/WhyAxon";
import Testimonials from "@/components/home/Testimonials";
import ReportPreview from "@/components/home/ReportPreview";
import Consultation from "@/components/home/Consultation";
import FinalCta from "@/components/home/FinalCta";

const HomePage = () => {
  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-cream">
        <Hero />
        <AssessmentMatrix />
        <Method />
        <WhyAxon />
        <Testimonials />
        <ReportPreview />
        <Consultation />
        <FinalCta />
      </main>
    </MotionConfig>
  );
};

export default HomePage;
