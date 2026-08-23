"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAssessmentQuestionQuery } from "@/redux/features/assessment.api";
import {
  AssessmentData,
  AssessmentQuestion,
  AnswerValue,
  FormState,
} from "../../../types/assessment";
import { QuestionField } from "./QuestionField";
import { isQuestionVisible } from "@/utils/conditional.logic";
import { GroupSection } from "./GroupSection";

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

  const setAnswer = (questionId: string, value: AnswerValue) =>
    setFormState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));

  const setInstanceAnswer = (
    groupId: string,
    instanceId: string,
    questionId: string,
    value: AnswerValue,
  ) =>
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

  if (isLoading) return <div className="p-8">Loading assessment...</div>;
  if (isError || !assessmentData)
    return <div className="p-8 text-red-500">Failed to load assessment.</div>;

  const currentStep = steps[stepIndex];
  const renderedGroupIds = new Set<string>();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {stepTitle(currentStep.questionType)}
      </h1>

      <div className="space-y-6">
        {currentStep.questions.map((q) => {
          if (q.groupId) {
            if (renderedGroupIds.has(q.groupId)) return null;
            renderedGroupIds.add(q.groupId);

            const group = groupsById.get(q.groupId);
            if (!group) return null;

            const groupQuestions = currentStep.questions
              .filter((gq) => gq.groupId === q.groupId)
              .sort((a, b) => a.order - b.order);

            // The whole group's visibility is gated by whichever field(s)
            // carry a dependsOnQuestionId pointing outside the group —
            // in this schema every field in the group shares that gate.
            const gateQuestion = groupQuestions.find(
              (gq) => gq.dependsOnQuestionId,
            );
            const gateVisible = gateQuestion
              ? isQuestionVisible(gateQuestion, resolveGlobalAnswer)
              : true;
            if (!gateVisible) return null;

            return (
              <GroupSection
                key={group.id}
                group={group}
                questions={groupQuestions}
                formState={formState}
                onInstanceChange={setInstanceAnswer}
                onAddInstance={addGroupInstance}
                onRemoveInstance={removeGroupInstance}
                resolveGlobalAnswer={resolveGlobalAnswer}
              />
            );
          }

          if (!isQuestionVisible(q, resolveGlobalAnswer)) return null;

          return (
            <QuestionField
              key={q.id}
              question={q}
              value={formState.answers[q.id]}
              onChange={(val) => setAnswer(q.id, val)}
            />
          );
        })}
      </div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          className="px-6 py-2 rounded-[7px] bg-gray-100 text-gray-500 disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
          className="px-6 py-2 rounded-[7px] bg-emerald-600 text-white"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AssessmentQuestionsFlow;
