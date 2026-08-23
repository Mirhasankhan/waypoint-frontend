import { baseApi } from "../api/baseApi";

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allAssessments: builder.query({
      query: () => ({
        url: "/question/all-assessments",
        method: "GET",
      }),
    }),
    assessmentQuestion: builder.query({
      query: (id: string) => ({
        url: `/question/assessment/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllAssessmentsQuery, useAssessmentQuestionQuery } = questionApi;
