import {
  AssessmentQuestion,
  AssessmentGroup,
  AnswerValue,
  FormState,
  ValidationErrors,
} from "@/types/assessment";
import { isQuestionVisible } from "./conditional.logic";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAnswer(question: AssessmentQuestion, value: AnswerValue): string | null {
  const isEmpty =
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);

  if (!question.isOptional && isEmpty) {
    return "This field is required.";
  }

  if (isEmpty) return null; // optional and empty — nothing else to check

  switch (question.inputType) {
    case "EMAIL":
      if (typeof value === "string" && !EMAIL_REGEX.test(value)) {
        return "Please enter a valid email address.";
      }
      break;

    case "NUMBER": {
      const num = Number(value);
      if (Number.isNaN(num)) return "Please enter a valid number.";
      if (question.minValue !== null && num < question.minValue) {
        return `Value cannot be less than ${question.minValue}.`;
      }
      if (question.maxValue !== null && num > question.maxValue) {
        return `Value cannot be greater than ${question.maxValue}.`;
      }
      break;
    }

    case "DATE": {
      const today = new Date().toISOString().split("T")[0];
      if (question.dateNotAllowed === "future" && typeof value === "string" && value > today) {
        return "Date cannot be in the future.";
      }
      if (question.dateNotAllowed === "past" && typeof value === "string" && value < today) {
        return "Date cannot be in the past.";
      }
      break;
    }

    default:
      break;
  }

  return null;
}

// Validates every visible question in the current step, including every
// instance of every visible repeatable group. Returns collected errors plus
// an overall isValid flag used to gate the "Continue" button.
export function validateStep(
  stepQuestions: AssessmentQuestion[],
  groupsById: Map<string, AssessmentGroup>,
  formState: FormState,
  resolveGlobalAnswer: (id: string) => AnswerValue
): { errors: ValidationErrors; isValid: boolean } {
  const errors: ValidationErrors = { answers: {}, groupInstances: {} };
  let isValid = true;
  const handledGroups = new Set<string>();

  for (const q of stepQuestions) {
    if (q.groupId) {
      if (handledGroups.has(q.groupId)) continue;
      handledGroups.add(q.groupId);

      const group = groupsById.get(q.groupId);
      if (!group) continue;

      const groupQuestions = stepQuestions.filter((gq) => gq.groupId === q.groupId);
      const gateQuestion = groupQuestions.find((gq) => gq.dependsOnQuestionId);
      const gateVisible = gateQuestion ? isQuestionVisible(gateQuestion, resolveGlobalAnswer) : true;
      if (!gateVisible) continue;

      const instances = formState.groupInstances[group.id] ?? [];
      const groupErrors: { [instanceId: string]: { [questionId: string]: string } } = {};

      for (const instance of instances) {
        const getAnswer = (id: string): AnswerValue =>
          instance.answers[id] !== undefined ? instance.answers[id] : resolveGlobalAnswer(id);

        const instanceErrors: { [questionId: string]: string } = {};
        for (const gq of groupQuestions) {
          if (!isQuestionVisible(gq, getAnswer)) continue;
          const err = validateAnswer(gq, instance.answers[gq.id]);
          if (err) {
            instanceErrors[gq.id] = err;
            isValid = false;
          }
        }
        if (Object.keys(instanceErrors).length) groupErrors[instance.instanceId] = instanceErrors;
      }

      if (Object.keys(groupErrors).length) errors.groupInstances[group.id] = groupErrors;
      continue;
    }

    if (!isQuestionVisible(q, resolveGlobalAnswer)) continue;
    const err = validateAnswer(q, formState.answers[q.id]);
    if (err) {
      errors.answers[q.id] = err;
      isValid = false;
    }
  }

  return { errors, isValid };
}