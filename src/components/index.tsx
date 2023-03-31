import "./index.css";
import { Chart } from "./Chart";
import { Filters } from "./Selectors";
import { SavedDataTable } from "./SavedDataTable";
import { useChartData } from "./Chart/useChartData";
import { ContentProvider } from "./ContentProvider";

import { useState } from "react";
import { ParametersData } from "./types/ParametersData";

const useChartParameters = () => {
  const getParametersFromStorage = () =>
    JSON.parse(localStorage.getItem("parameters") || "[]");

  const [savedParameters, setSavedParameters] = useState<ParametersData[] | []>(
    getParametersFromStorage()
  );

  const updateParameters = () => {
    const parameters = getParametersFromStorage();
    setSavedParameters(parameters);
  };

  return {
    savedParameters,
    updateParameters,
  };
};

export function Content() {
  const { savedParameters, updateParameters } = useChartParameters();
  const { chartData } = useChartData();
  console.log(savedParameters);
  return (
    <ContentProvider>
      <div className='container'>
        <h1>Norway Real-Estate Price per Square Meter</h1>
        <Filters chartData={chartData} />
        <Chart updateParameters={updateParameters} chartData={chartData} />
        {savedParameters.length > 0 && (
          <SavedDataTable savedParameters={savedParameters} />
        )}
      </div>
    </ContentProvider>
  );
}
