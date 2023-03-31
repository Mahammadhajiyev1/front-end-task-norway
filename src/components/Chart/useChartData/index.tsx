import { useEffect, useState } from "react";
import { fetchChartData } from "../../../API/fetchData";
import { HouseTypes } from "../../types/HouseTypes";
import { ChartData } from "../../types/ChartData";
import { ParametersData } from "../../types/ParametersData";
import { useSearchParams } from "react-router-dom";

const getSelectedQuarterPrice = (
  squarePerMeterPrices: number[],
  quartersArray: string[]
) => {
  const getQuarterWithPairedSquarePerMeterPriceArray = [];
  for (let i = 0; i < squarePerMeterPrices.length; i++) {
    getQuarterWithPairedSquarePerMeterPriceArray.push({
      quarterRange: quartersArray[i],
      price: squarePerMeterPrices[i],
    });
  }
  return getQuarterWithPairedSquarePerMeterPriceArray;
};
const getQuartersArray = (startQuarter: string, endQuarter: string) => {
  const quarters: string[] = [];
  const startYear = parseInt(startQuarter.slice(0, 4));
  const endYear = parseInt(endQuarter.slice(0, 4));
  const startQuarterNumber = parseInt(startQuarter.slice(5));
  const endQuarterNumber = parseInt(endQuarter.slice(5));

  for (let year = startYear; year <= endYear; year++) {
    const start = year === startYear ? startQuarterNumber : 1;
    const end = year === endYear ? endQuarterNumber : 4;
    for (let quarter = start; quarter <= end; quarter++) {
      quarters.push(`${year}K${quarter}`);
    }
  }
  return quarters;
};

export function useChartData() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const startQuarter = searchParams.get("startQuarter") ?? "";
    const endQuarter = searchParams.get("endQuarter") ?? "";
    const houseType = searchParams.get("houseType") ?? "";
    const parametersStorage: ParametersData[] = JSON.parse(
      localStorage.getItem("parameters") || "null"
    );
    const savedChartData = parametersStorage?.find(
      (storageElement) =>
        storageElement.startQuarter === startQuarter &&
        storageElement.endQuarter === endQuarter &&
        storageElement.houseType === houseType
    );
    if (savedChartData) {
      setChartData({
        chartPoints: savedChartData.chartPoints,
        houseType: savedChartData.houseType,
      });
      return;
    }
    const getChartData = async () => {
      const quartersArray = getQuartersArray(startQuarter, endQuarter);
      const houseTypeApiValue = getHouseTypesApiValue(houseType);
      try {
        const chartRawData = await fetchChartData(
          quartersArray,
          houseTypeApiValue
        );
        const quarterWithPairedSquarePerMeterPrice = getSelectedQuarterPrice(
          chartRawData.value,
          quartersArray
        );
        setChartData({
          chartPoints: quarterWithPairedSquarePerMeterPrice,
          houseType,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (startQuarter && endQuarter && houseType) {
      getChartData();
    }
  }, [searchParams]);
  const getHouseTypesApiValue = (houseType: string): string | undefined => {
    switch (houseType) {
      case HouseTypes.All:
        return "00";
      case HouseTypes.Houses:
        return "02";
      case HouseTypes.Apartment:
        return "03";
      default:
        return undefined;
    }
  };

  return {
    chartData,
  };
}
