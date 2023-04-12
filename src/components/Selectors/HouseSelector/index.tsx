import React, { ChangeEvent } from "react";
import { NativeSelect } from "@mui/material";
import { HouseTypes } from "../../types/HouseTypes";
import { FormValues } from "../../types/FormValues";
import { useFormContext } from "react-hook-form";

export function HouseSelector() {
  const { register, setValue } = useFormContext<FormValues>();
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue("houseType", event.target.value);
  };
  return (
    <NativeSelect
      sx={{ color: "success.main" }}
      {...register("houseType")}
      onChange={onChange}
    >
      <option value={HouseTypes.All}>{HouseTypes.All}</option>
      <option value={HouseTypes.Apartment}>{HouseTypes.Apartment}</option>
      <option value={HouseTypes.Houses}>{HouseTypes.Houses}</option>
    </NativeSelect>
  );
}
