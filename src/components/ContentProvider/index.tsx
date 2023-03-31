import { useForm, FormProvider } from "react-hook-form";
import { FormValues } from "../types/FormValues";
import { HouseTypes } from "../types/HouseTypes";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ContentProvider({ children }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: { houseType: HouseTypes.All, quarters: [14, 32] },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
