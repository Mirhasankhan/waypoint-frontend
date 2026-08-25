"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAssessmentQuestionQuery } from "@/redux/features/assessment.api";
import {
  AssessmentData,
  AssessmentQuestion,
  AnswerValue,
  FormState,
  ValidationErrors,
} from "@/types/assessment";
import { QuestionField } from "./QuestionField";
import { GroupSection } from "./GroupSection";
import { isQuestionVisible } from "@/utils/conditional.logic";
import { validateStep } from "@/utils/validation";

function buildSteps(questions: AssessmentQuestion[]) {
  const byType = new Map<string, AssessmentQuestion[]>();
  for (const q of [...questions].sort((a, b) => a.order - b.order)) {
    if (!byType.has(q.questionType)) byType.set(q.questionType, []);
    byType.get(q.questionType)!.push(q);
  }
  return Array.from(byType.entries()).map(([questionType, qs]) => ({
    questionType,
    questions: qs,
  }));
}

function stepTitle(questionType: string) {
  return questionType
    .toLowerCase()
    .split("_")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

const emptyErrors: ValidationErrors = { answers: {}, groupInstances: {} };

const AssessmentQuestionsFlow = () => {
  const { assessment } = useParams();
  const { data, isLoading, isError } = useAssessmentQuestionQuery(
    assessment as string,
  );
  const assessmentData = data?.result as AssessmentData | undefined;

  const [stepIndex, setStepIndex] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    answers: {},
    groupInstances: {},
  });
  const [errors, setErrors] = useState<ValidationErrors>(emptyErrors);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

  const steps = useMemo(
    () => (assessmentData ? buildSteps(assessmentData.questions) : []),
    [assessmentData],
  );
  const groupsById = useMemo(() => {
    const map = new Map<string, AssessmentData["groups"][number]>();
    assessmentData?.groups.forEach((g) => map.set(g.id, g));
    return map;
  }, [assessmentData]);

  const resolveGlobalAnswer = (questionId: string): AnswerValue => {
    if (formState.answers[questionId] !== undefined)
      return formState.answers[questionId];
    for (const instances of Object.values(formState.groupInstances)) {
      const found = instances[0]?.answers[questionId];
      if (found !== undefined) return found;
    }
    return undefined;
  };

  const setAnswer = (questionId: string, value: AnswerValue) => {
    setFormState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
    setErrors((prev) => {
      if (!(questionId in prev.answers)) return prev;
      const next = { ...prev.answers };
      delete next[questionId];
      return { ...prev, answers: next };
    });
  };

  const setInstanceAnswer = (
    groupId: string,
    instanceId: string,
    questionId: string,
    value: AnswerValue,
  ) => {
    setFormState((prev) => ({
      ...prev,
      groupInstances: {
        ...prev.groupInstances,
        [groupId]: (prev.groupInstances[groupId] ?? []).map((inst) =>
          inst.instanceId === instanceId
            ? { ...inst, answers: { ...inst.answers, [questionId]: value } }
            : inst,
        ),
      },
    }));
    setErrors((prev) => {
      const instanceErrors = prev.groupInstances[groupId]?.[instanceId];
      if (!instanceErrors || !(questionId in instanceErrors)) return prev;
      const nextInstanceErrors = { ...instanceErrors };
      delete nextInstanceErrors[questionId];
      return {
        ...prev,
        groupInstances: {
          ...prev.groupInstances,
          [groupId]: {
            ...prev.groupInstances[groupId],
            [instanceId]: nextInstanceErrors,
          },
        },
      };
    });
  };

  const addGroupInstance = (groupId: string) =>
    setFormState((prev) => ({
      ...prev,
      groupInstances: {
        ...prev.groupInstances,
        [groupId]: [
          ...(prev.groupInstances[groupId] ?? []),
          { instanceId: crypto.randomUUID(), answers: {} },
        ],
      },
    }));

  const removeGroupInstance = (groupId: string, instanceId: string) =>
    setFormState((prev) => ({
      ...prev,
      groupInstances: {
        ...prev.groupInstances,
        [groupId]: (prev.groupInstances[groupId] ?? []).filter(
          (inst) => inst.instanceId !== instanceId,
        ),
      },
    }));

  const handleContinue = () => {
    if (!currentStep) return;
    const { errors: stepErrors, isValid } = validateStep(
      currentStep.questions,
      groupsById,
      formState,
      resolveGlobalAnswer,
    );
    setErrors(stepErrors);
    if (isValid) setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  };

  if (isLoading) return <div className="p-8">Loading assessment...</div>;
  if (isError || !assessmentData)
    return <div className="p-8 text-red-500">Failed to load assessment.</div>;

  const currentStep = steps[stepIndex];
  const renderedGroupIds = new Set<string>();
  const totalSteps = steps.length;
  const completedSteps = stepIndex + 1;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 text-sm font-semibold uppercase tracking-wide">
          <span className="text-slate-500">
            Step {completedSteps} of {totalSteps}
          </span>
          <span className="text-emerald-600">{progressPercentage}%</span>
        </div>
        <div
          className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuenow={completedSteps}
          aria-label={`Assessment progress: ${completedSteps} of ${totalSteps} steps`}
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-8">
        {stepTitle(currentStep.questionType)}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentStep.questions.map((q) => {
          if (q.groupId) {
            if (renderedGroupIds.has(q.groupId)) return null;
            renderedGroupIds.add(q.groupId);

            const group = groupsById.get(q.groupId);
            if (!group) return null;

            const groupQuestions = currentStep.questions
              .filter((gq) => gq.groupId === q.groupId)
              .sort((a, b) => a.order - b.order);

            const gateQuestion = groupQuestions.find(
              (gq) => gq.dependsOnQuestionId,
            );
            const gateVisible = gateQuestion
              ? isQuestionVisible(gateQuestion, resolveGlobalAnswer)
              : true;
            if (!gateVisible) return null;

            return (
              <div key={group.id} className="md:col-span-2">
                <GroupSection
                  group={group}
                  questions={groupQuestions}
                  formState={formState}
                  onInstanceChange={setInstanceAnswer}
                  onAddInstance={addGroupInstance}
                  onRemoveInstance={removeGroupInstance}
                  resolveGlobalAnswer={resolveGlobalAnswer}
                  errors={errors.groupInstances[group.id]}
                />
              </div>
            );
          }

          if (!isQuestionVisible(q, resolveGlobalAnswer)) return null;

          return (
            <QuestionField
              key={q.id}
              question={q}
              value={formState.answers[q.id]}
              onChange={(val) => setAnswer(q.id, val)}
              error={errors.answers[q.id]}
            />
          );
        })}
      </div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          disabled={stepIndex === 0}
          onClick={() => {
            setErrors(emptyErrors);
            setStepIndex((i) => Math.max(0, i - 1));
          }}
          className="px-6 py-2 rounded-[7px] bg-gray-100 text-gray-500 disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="px-6 py-2 rounded-[7px] bg-emerald-600 text-white"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AssessmentQuestionsFlow;
