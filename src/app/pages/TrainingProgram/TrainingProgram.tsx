"use client";
import * as React from "react";
import { ProgramContent } from "@/components/TrainingProgram/ProgramContent"
import "@/styles/training-program.css"
import {SectionTitle} from "@/components/SectionTitle"

export function TrainingProgram() {
  return (
    <section id={"program"}>
        <SectionTitle text={"Программа обучения"} />
      <ProgramContent />
    </section>
  );
}

export default TrainingProgram;
