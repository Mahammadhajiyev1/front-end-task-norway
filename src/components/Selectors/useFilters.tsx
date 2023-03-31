import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormValues } from "../types/FormValues";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ParametersData } from "../types/ParametersData";

export function useFilters() {
  const { handleSubmit, setValue } = useFormContext<FormValues>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isChartDataLoading, setIsChartDataLoading] = useState<boolean>(false);
  const savedQuarters = localStorage.getItem("quarters");
  const savedHouseTypes = localStorage.getItem("house-type");

  useEffect(() => {
    if (savedQuarters && savedHouseTypes) {
      setValue("quarters", JSON.parse(savedQuarters));
      setValue("houseType", savedHouseTypes);
    }
  }, [setValue, savedQuarters, savedHouseTypes]);

  const getQuarterString = (quarter: number) => {
    const year = Math.floor(quarter / 4) + 2009;
    const quarterNumber = (quarter % 4) + 1;
    return `${year}K${quarterNumber}`;
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const startQuarter = getQuarterString(data.quarters[0]);
    const endQuarter = getQuarterString(data.quarters[1]);
    const parametersStorage: ParametersData[] = JSON.parse(
      localStorage.getItem("parameters") || "null"
    );
    const savedChartData = parametersStorage?.find(
      (storageElement) =>
        storageElement.startQuarter === startQuarter &&
        storageElement.endQuarter === endQuarter &&
        storageElement.houseType === data.houseType
    );
    if (savedChartData) {
      parametersStorage.splice(parametersStorage.indexOf(savedChartData), 1);
      localStorage.setItem("parameters", JSON.stringify(parametersStorage));
    }
    const queryParams = new URLSearchParams({
      startQuarter,
      endQuarter,
      houseType: data.houseType,
    });

    setSearchParams(queryParams);
    setIsChartDataLoading(true);
    localStorage.setItem("quarters", JSON.stringify(data.quarters));
    localStorage.setItem("house-type", data.houseType);
  };

  return {
    getQuarterString,
    onSubmit,
    handleSubmit,
    searchParams,
    isChartDataLoading,
  };
}
