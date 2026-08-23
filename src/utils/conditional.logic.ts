import { AnswerValue, AssessmentQuestion, RuleOperator } from "../types/assessment"



function toComparable(value: AnswerValue): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join(",");
  return String(value);
}

export function evaluateRule(
  operator: RuleOperator,
  actualValue: AnswerValue,
  expectedValue: string | null
): boolean {
  const list = (expectedValue ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  switch (operator) {
    case "IS_TRUE":
      return actualValue === true;
    case "IS_FALSE":
      return actualValue === false;
    case "IS_EMPTY":
      return (
        actualValue === null ||
        actualValue === undefined ||
        actualValue === "" ||
        (Array.isArray(actualValue) && actualValue.length === 0)
      );
    case "IS_NOT_EMPTY":
      return !evaluateRule("IS_EMPTY", actualValue, null);
    case "EQUALS":
      return toComparable(actualValue) === (expectedValue ?? "");
    case "NOT_EQUALS":
      return toComparable(actualValue) !== (expectedValue ?? "");
    case "GREATER_THAN":
      return Number(actualValue) > Number(expectedValue);
    case "GREATER_THAN_OR_EQUAL":
      return Number(actualValue) >= Number(expectedValue);
    case "LESS_THAN":
      return Number(actualValue) < Number(expectedValue);
    case "LESS_THAN_OR_EQUAL":
      return Number(actualValue) <= Number(expectedValue);
    case "IN_LIST":
      return list.includes(toComparable(actualValue));
    case "NOT_IN_LIST":
      return !list.includes(toComparable(actualValue));
    case "CONTAINS":
      if (Array.isArray(actualValue)) return list.some((v) => actualValue.includes(v));
      return toComparable(actualValue).includes(expectedValue ?? "");
    case "NOT_CONTAINS":
      return !evaluateRule("CONTAINS", actualValue, expectedValue);
    default:
      return true;
  }
}

// getAnswer should check the local group-instance answers first, then fall
// back to top-level flat answers — dependsOnQuestionId is just a question
// "id" and may point inside or outside the current group.
export function isQuestionVisible(
  question: AssessmentQuestion,
  getAnswer: (questionId: string) => AnswerValue
): boolean {
  if (!question.dependsOnQuestionId || !question.dependsOnOperator) return true;
  const actual = getAnswer(question.dependsOnQuestionId);
  return evaluateRule(question.dependsOnOperator, actual, question.dependsOnValue);
}