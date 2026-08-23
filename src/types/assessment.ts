export type InputType =
  | "TEXT" | "EMAIL" | "NUMBER" | "SELECT"
  | "MULTI_SELECT" | "BOOLEAN" | "DATE" | "TEXTAREA";

export type RuleOperator =
  | "EQUALS" | "NOT_EQUALS"
  | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN" | "LESS_THAN_OR_EQUAL"
  | "IN_LIST" | "NOT_IN_LIST"
  | "CONTAINS" | "NOT_CONTAINS"
  | "IS_TRUE" | "IS_FALSE"
  | "IS_EMPTY" | "IS_NOT_EMPTY";

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  helpText: string | null;
  questionId: string;
}

export interface AssessmentQuestion {
  id: string;
  questionId: string;
  questionText: string;
  inputType: InputType;
  questionType: string;
  order: number;
  assesmentId: string;
  groupId: string | null;
  dependsOnQuestionId: string | null;
  dependsOnOperator: RuleOperator | null;
  dependsOnValue: string | null;
  isCountry: boolean;
  isOptional: boolean;
  helpText: string | null;
  dateNotAllowed: "future" | "past" | null;
  maxValue: number | null;
  minValue: number | null;
  options: QuestionOption[];
}

export interface AssessmentGroup {
  id: string;
  assesmentId: string;
  groupKey: string;
  title: string;
  isRepeatable: boolean;
  minInstances: number;
  maxInstances: number | null;
  order: number;
}

export interface AssessmentData {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
  groups: AssessmentGroup[];
}

export type AnswerValue = string | number | boolean | string[] | null | undefined;

export interface FlatAnswers {
  [questionId: string]: AnswerValue; // keyed by question.id
}

export interface GroupInstanceState {
  instanceId: string;
  answers: FlatAnswers;
}

export interface FormState {
  answers: FlatAnswers;
  groupInstances: {
    [groupId: string]: GroupInstanceState[];
  };
}