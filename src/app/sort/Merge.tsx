"use client";
import { useState } from "react";
import mergesort from "./mergesort";

// Helper function to check and add unique entries to the state
const addUniqueStep = (
  stepsArray: any[][],
  newStep: any[],
  level: number
): any[][] => {
  const newSteps = [...stepsArray];
  
  // Ensure the level exists
  if (!newSteps[level]) {
    newSteps[level] = [];
  }
  
  // Convert the new step to a string for comparison
  const newStepStr = JSON.stringify(newStep);
  
  // Check if the new step already exists in the current level
  const isDuplicate = newSteps[level].some(
    (step) => JSON.stringify(step) === newStepStr
  );
  
  // If it's not a duplicate, add the new step
  if (!isDuplicate) {
    newSteps[level].push(newStep);
  }
  
  return newSteps;
};

export default function Merge() {
  const [steps, setSteps] = useState<number[][]>([]);
  const [divideSteps, setDivideSteps] = useState<number[][][]>([]);
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Callback for merge steps
  const callbackMerge = async (merged: number[], level: number) => {
    await delay(500);
    setSteps((prevSteps) => addUniqueStep(prevSteps, merged, level));
  };

  // Callback for divide steps
  const callbackDivide = async (left: number[], right: number[], level: number) => {
    await delay(500);
    setDivideSteps((prevSteps) =>
      addUniqueStep(prevSteps, [left, right], level)
    );
  };

  async function onButtonClick(): Promise<void> {
    setSteps([]);
    setDivideSteps([]);
    await mergesort([2, 6, 5, 1, 7, 4, 8, 3], callbackMerge, callbackDivide, 0);
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 p-4">
        {/* Initial array display before sorting starts */}
        {steps.length === 0 && divideSteps.length === 0 &&
          [2, 6, 5, 1, 7, 4, 8, 3].map((item, index) => {
            let bgColor = "bg-yellow-100";
            return (
              <div
                key={index}
                className={`${bgColor} p-6 rounded-lg shadow-md text-center font-medium text-lg`}
              >
                {item}
              </div>
            );
          })}
      </div>

      <button
        onClick={onButtonClick}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Start
      </button>

      {/* Display the divide steps */}
      {divideSteps.length > 0 && (
        <div className="mt-8">
          {divideSteps.map((levelSteps, levelIndex) => (
            <div key={levelIndex} className="mb-4">
              <h3 className="font-semibold mb-2">Divide Level {levelIndex + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {levelSteps.map((step, stepIndex) => (
                  <div key={stepIndex} className="p-4 bg-yellow-200 rounded-lg text-center font-medium text-lg">
                    <div>Left: [{step[0].join(", ")}]</div>
                    <div>Right: [{step[1].join(", ")}]</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display the merge sort steps */}
      {steps.length > 0 && (
        <div className="mt-8">
          {[...steps].reverse().map((levelSteps, levelIndex) => (
            <div key={levelIndex} className="mb-4">
              <h3 className="font-semibold mb-2">Merge Level {levelIndex + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {levelSteps && levelSteps.map((merged, mergeIndex) => (
                  <div
                    key={mergeIndex}
                    className="p-4 bg-green-200 rounded-lg text-center font-medium text-lg"
                  >
                    {merged.join(", ")}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
