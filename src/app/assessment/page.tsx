import Container from "@/utils/Container";
import React from "react";
import AllAssessments from "./components/AllAssessments";

const AssessmentPage = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white ">
      <Container>
        <AllAssessments></AllAssessments>
      </Container>
    </div>
  );
};

export default AssessmentPage;
