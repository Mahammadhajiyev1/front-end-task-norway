import "./index.css";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ChartData } from "../types/ChartData";
import { ParametersData } from "../types/ParametersData";

interface Props {
  chartData: ChartData | null;

  updateParameters: () => void;
}

export function Chart({ chartData, updateParameters }: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [searchParams] = useSearchParams();
  const startQuarter = searchParams.get("startQuarter");
  const endQuarter = searchParams.get("endQuarter");
  const houseType = searchParams.get("houseType");
  const commentKey = `${startQuarter}-${endQuarter}-${houseType}`;

  useEffect(() => {
    const storedComment = localStorage.getItem(commentKey);
    if (storedComment) {
      setComment(storedComment);
    } else {
      setComment("");
    }
  }, [searchParams, commentKey]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleAddComment = () => {
    setComment(inputValue);
    localStorage.setItem(commentKey, inputValue);
    setInputValue("");
  };

  const handleSaveChartData = () => {
    const parametersStorage = JSON.parse(
      localStorage.getItem("parameters") || "[]"
    );
    const savedChartData = parametersStorage?.find(
      (storageElement: ParametersData) =>
        storageElement.startQuarter === startQuarter &&
        storageElement.endQuarter === endQuarter &&
        storageElement.houseType === houseType
    );
    if (savedChartData) {
      parametersStorage.splice(parametersStorage.indexOf(savedChartData), 1);
    }
    const parametersToSave = {
      startQuarter,
      endQuarter,
      chartPoints: chartData?.chartPoints,
      houseType: chartData?.houseType,
      comment,
    };
    parametersStorage.unshift(parametersToSave);
    localStorage.setItem("parameters", JSON.stringify(parametersStorage));
    updateParameters();
  };

  return (
    chartData && (
      <div className='container'>
        <Button
          sx={{ color: "success.main" }}
          variant='outlined'
          onClick={handleSaveChartData}
        >
          Save Chart Data
        </Button>
        <h3>Chart for {chartData.houseType} house type</h3>
        <AreaChart
          width={730}
          height={250}
          data={chartData.chartPoints}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='quarterRange' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='price'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#colorPv)'
          />
        </AreaChart>
        <div className='comments'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            sx={{ color: "success.main" }}
            variant='outlined'
            onClick={handleAddComment}
          >
            {/* Add Comment */}
            {comment.length > 0 ? "Update Comment" : "Add Comment"}
          </Button>
        </div>
        <p>{comment}</p>
      </div>
    )
  );
}
