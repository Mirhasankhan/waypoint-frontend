"use client";

import { useEffect } from "react";
import {
  AssessmentGroup,
  AssessmentQuestion,
  FormState,
  AnswerValue,
} from "../../../types/assessment";
import { isQuestionVisible } from "@/utils/conditional.logic";
import { QuestionField } from "./QuestionField";

interface GroupSectionProps {
  group: AssessmentGroup;
  questions: AssessmentQuestion[]; // all questions sharing this groupId, sorted by order
  formState: FormState;
  onInstanceChange: (
    groupId: string,
    instanceId: string,
    questionId: string,
    value: AnswerValue,
  ) => void;
  onAddInstance: (groupId: string) => void;
  onRemoveInstance: (groupId: string, instanceId: string) => void;
  resolveGlobalAnswer: (questionId: string) => AnswerValue;
}

export function GroupSection({
  group,
  questions,
  formState,
  onInstanceChange,
  onAddInstance,
  onRemoveInstance,
  resolveGlobalAnswer,
}: GroupSectionProps) {
  const instances = formState.groupInstances[group.id] ?? [];

  // Seed the first instance once the group becomes visible.
  useEffect(() => {
    if (instances.length === 0) onAddInstance(group.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instances.length, group.id]);

  return (
    <div className="space-y-4">
      {instances.map((instance) => {
        // local instance answers take priority, then fall back to top-level answers
        const getAnswer = (questionId: string): AnswerValue =>
          instance.answers[questionId] !== undefined
            ? instance.answers[questionId]
            : resolveGlobalAnswer(questionId);

        return (
          <div
            key={instance.instanceId}
            className="border rounded-xl p-5 space-y-5 relative"
          >
            {instances.length > Math.max(1, group.minInstances) && (
              <button
                type="button"
                onClick={() => onRemoveInstance(group.id, instance.instanceId)}
                className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500"
              >
                Remove
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {questions
                .filter((q) => isQuestionVisible(q, getAnswer))
                .map((q) => (
                  <QuestionField
                    key={q.id}
                    question={q}
                    value={instance.answers[q.id]}
                    onChange={(val) =>
                      onInstanceChange(group.id, instance.instanceId, q.id, val)
                    }
                  />
                ))}
            </div>
          </div>
        );
      })}

      {group.isRepeatable &&
        (group.maxInstances == null ||
          instances.length < group.maxInstances) && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Do you want to add another {group.title}?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onAddInstance(group.id)}
                className="px-6 py-2 rounded-[7px] bg-gray-100 text-gray-500 hover:bg-emerald-600 hover:text-white"
              >
                Yes
              </button>
              <button
                type="button"
                className="px-6 py-2 rounded-[7px] bg-gray-100 text-gray-500"
              >
                No
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
