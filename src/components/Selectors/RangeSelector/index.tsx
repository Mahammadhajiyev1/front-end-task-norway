import { Slider } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types/FormValues";

type RangePickerProps = {
  getQuarterString: (value: number) => string;
};
export function RangePicker({ getQuarterString }: RangePickerProps) {
  const { setValue, watch } = useFormContext<FormValues>();
  const quarters = watch("quarters");
  const minSliderDistance = 1;
  const handleQuartersChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue("quarters", [
        Math.min(newValue[0], quarters[1] - minSliderDistance),
        quarters[1],
      ]);
    } else {
      setValue("quarters", [
        quarters[0],
        Math.max(newValue[1], quarters[0] + minSliderDistance),
      ]);
    }
  };

  return (
    <Slider
      onChange={handleQuartersChange}
      sx={{
        width: 300,
        color: "success.main",
        "& .MuiSlider-thumb": {
          borderRadius: "1px",
        },
      }}
      value={quarters}
      min={0}
      max={55}
      step={1}
      marks={[
        { value: 0, label: "2009K1" },
        { value: 15, label: "2013K1" },
        { value: 28, label: "2016K1" },
        { value: 43, label: "2019K4" },
        { value: 55, label: "2022K4" },
      ]}
      disableSwap
      valueLabelFormat={(value) => <div>{getQuarterString(value)}</div>}
      valueLabelDisplay='auto'
    />
  );
}
