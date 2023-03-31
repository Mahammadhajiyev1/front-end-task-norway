import React from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { HouseSelector } from "./HouseSelector";
import { RangePicker } from "./RangeSelector";
import { useFilters } from "./useFilters";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types/FormValues";
import { ChartData } from "../types/ChartData";

interface Props {
  chartData: ChartData | null;
}
export function Filters({ chartData }: Props) {
  const { getQuarterString, onSubmit, handleSubmit, isChartDataLoading } =
    useFilters();
  const { watch } = useFormContext<FormValues>();
  const quarterValues = watch("quarters");

  return (
    <>
      <h3>Select parameters for chart</h3>
      <div className='inputs'>
        <div className='house'>
          <p>House type</p>
          <HouseSelector />
        </div>
        <div className='slider'>
          <p>Quarters range</p>
          <RangePicker getQuarterString={getQuarterString} />
          <Typography variant='body1'>
            {`Range from ${getQuarterString(
              quarterValues[0]
            )} - to ${getQuarterString(quarterValues[1])}`}
          </Typography>
        </div>
      </div>
      <Button
        variant='outlined'
        sx={{ marginTop: 3, color: "success.main" }}
        onClick={handleSubmit(onSubmit)}
      >
        {!chartData ? "SHOW CHART" : "UPDATE CHART"}
      </Button>
      {isChartDataLoading && !chartData && <CircularProgress />}
    </>
  );
}
