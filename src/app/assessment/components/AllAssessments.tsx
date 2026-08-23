"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Briefcase,
  Rocket,
  Repeat,
  Building2,
  Clock,
  Check,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { useAllAssessmentsQuery } from "@/redux/features/assessment.api";
import { Skeleton } from "@/components/ui/skeleton";

type AssessmentMeta = {
  icon: LucideIcon;
  iconBg: string;
  description: string;
  minutes: number;
};

const ASSESSMENT_RULES: { keywords: string[]; meta: AssessmentMeta }[] = [
  {
    keywords: ["study"],
    meta: {
      icon: GraduationCap,
      iconBg: "bg-emerald-500",
      description:
        "Academic studies, language programs, and degree paths abroad.",
      minutes: 5,
    },
  },
  {
    keywords: ["founder"],
    meta: {
      icon: Rocket,
      iconBg: "bg-orange-500",
      description:
        "Founder and entrepreneur readiness for building your own business.",
      minutes: 6,
    },
  },
  {
    keywords: ["career change"],
    meta: {
      icon: Repeat,
      iconBg: "bg-pink-500",
      description:
        "Switching industries or roles and mapping out a new career direction.",
      minutes: 5,
    },
  },
  {
    keywords: ["career path", "career"],
    meta: {
      icon: Briefcase,
      iconBg: "bg-blue-500",
      description:
        "Skilled employment and career pathways matched to your background.",
      minutes: 6,
    },
  },
];

const DEFAULT_META: AssessmentMeta = {
  icon: Building2,
  iconBg: "bg-slate-500",
  description: "Find out which pathway fits your goals.",
  minutes: 5,
};

function getAssessmentMeta(title: string): AssessmentMeta {
  const normalized = title.toLowerCase();
  const rule = ASSESSMENT_RULES.find((r) =>
    r.keywords.some((kw) => normalized.includes(kw)),
  );
  return rule?.meta ?? DEFAULT_META;
}

const AllAssessments = () => {
  const { data, error, isLoading } = useAllAssessmentsQuery("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const assessments = data?.result ?? [];
  const selected = assessments.find((a: any) => a.id === selectedId);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              What brings you here?
            </h1>
            <p className="text-slate-500 max-w-lg mx-auto">
              Select the assessment that best matches your goal. You can change
              this later.
            </p>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border-2 border-transparent shadow-sm space-y-4"
              >
                <Skeleton className="w-11 h-11 rounded-xl bg-slate-200" />
                <Skeleton className="h-5 w-3/4 bg-slate-200" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-slate-200" />
                  <Skeleton className="h-4 w-5/6 bg-slate-200" />
                </div>
                <Skeleton className="h-3.5 w-32 bg-slate-200" />
              </div>
            ))}
          </div>

          {/* Footer bar */}
          <div className="bg-white rounded-2xl shadow-md px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100">
                <Check className="w-3.5 h-3.5 text-slate-300" strokeWidth={3} />
              </span>
              <span className="text-slate-600">No assessment selected yet</span>
            </div>
            <button
              type="button"
              disabled
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-slate-200 text-slate-400 cursor-not-allowed"
            >
              Continue to Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
        <p className="text-red-500">
          Something went wrong loading assessments. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            What brings you here?
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Select the assessment that best matches your goal. You can change
            this later.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          {assessments.map((assessment: any) => {
            const meta = getAssessmentMeta(assessment.title);
            const Icon = meta.icon;
            const isSelected = assessment.id === selectedId;

            return (
              <button
                key={assessment.id}
                type="button"
                onClick={() => setSelectedId(assessment.id)}
                className={`relative text-left bg-white rounded-2xl p-5 border-2 transition-all shadow-sm hover:shadow-md ${
                  isSelected ? "border-emerald-500" : "border-transparent"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                )}

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${meta.iconBg}`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {assessment.title}
                </h3>

                <p className="text-sm text-slate-500 leading-snug mb-4">
                  {meta.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{meta.minutes} min assessment</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer bar */}
        <div className="bg-white rounded-2xl shadow-md px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                selected ? "bg-emerald-100" : "bg-slate-100"
              }`}
            >
              <Check
                className={`w-3.5 h-3.5 ${
                  selected ? "text-emerald-600" : "text-slate-300"
                }`}
                strokeWidth={3}
              />
            </span>
            <span className="text-slate-600">
              {selected ? (
                <>
                  Selected:{" "}
                  <span className="font-bold text-slate-900">
                    {selected.title}
                  </span>
                </>
              ) : (
                "No assessment selected yet"
              )}
            </span>
          </div>

          <button
            type="button"
            disabled={!selected}
            onClick={() =>
              selected && router.push(`/assessment/${selected.id}`)
            }
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors ${
              selected
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Continue to Assessment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllAssessments;
