import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ParametersData } from "../types/ParametersData";
import { useSearchParams } from "react-router-dom";

interface Props {
  savedParameters: ParametersData[];
}
export function SavedDataTable({ savedParameters }: Props) {
  const [, setSearchParams] = useSearchParams();

  const handleDisplayChart = (savedParameters: ParametersData) => {
    const startQuarter = savedParameters.startQuarter;
    const endQuarter = savedParameters.endQuarter;
    const queryParams = new URLSearchParams({
      startQuarter,
      endQuarter,
      houseType: savedParameters.houseType,
    });
    setSearchParams(queryParams);
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>House Type</TableCell>
              <TableCell align='center'>Quarters</TableCell>
              <TableCell align='center'>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedParameters.map((row: ParametersData, index: number) => (
              <TableRow
                hover={true}
                onClick={() => handleDisplayChart(row)}
                key={index}
              >
                <TableCell align='center'>{row.houseType}</TableCell>
                <TableCell align='center'>
                  {row.startQuarter} - {row.endQuarter}
                </TableCell>
                <TableCell align='center'>{row.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
