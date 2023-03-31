interface ChartData {
  value: number[];
}
export async function fetchChartData(
  quarters: string[],
  typeApiValue: string | undefined
): Promise<ChartData> {
  const url = "https://data.ssb.no/api/v0/no/table/07241";
  const query = {
    query: [
      {
        code: "Boligtype",
        selection: {
          filter: "item",
          values: [typeApiValue],
        },
      },
      {
        code: "ContentsCode",
        selection: {
          filter: "item",
          values: ["KvPris"],
        },
      },
      {
        code: "Tid",
        selection: {
          filter: "item",
          values: quarters,
        },
      },
    ],
    response: {
      format: "json-stat2",
    },
  };
  const fetchResult = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
  return fetchResult.json();
}
