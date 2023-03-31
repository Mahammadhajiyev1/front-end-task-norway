import { FieldValues } from "react-hook-form";

export interface FormValues extends FieldValues {
  houseType: string;

  quarters: number[];
}
