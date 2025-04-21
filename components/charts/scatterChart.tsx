'use client'

import { ScatterChart } from '@mantine/charts';
import { useMemo } from 'react';
import { ResponsiveContainer } from 'recharts';
import { Data } from '@/types/data';

export default function Scatter({ data, xAttribute, yAttribute }: { data: Data[], xAttribute: string, yAttribute: string }) {

    const aggregatedData = useMemo(() => {
        // Group by x attribute values
        const groupedData = data.reduce((acc: Record<string, { values: number[]; count: number }>, item) => {
            const xValue = item[xAttribute as keyof Data];
            const yValue = item[yAttribute as keyof Data];
            
            // Convert to string for use as object key
            const key = String(xValue);
            
            if (!acc[key]) {
                acc[key] = { values: [], count: 0 };
            }
            
            // Store the y-values for this x key
            acc[key].values.push(Number(yValue));
            acc[key].count += 1;
            return acc;
        }, {});

        // Convert grouped data to array format needed by chart
        return Object.entries(groupedData).map(([key, group]) => {
            const sum = group.values.reduce((a, b) => a + b, 0);
            const avg = sum / group.count;
            
            return {
                [xAttribute]: Number(key),
                [yAttribute]: avg,
                count: group.count
            };
        });
    }, [data, xAttribute, yAttribute]);

    return (
        <div className="flex flex-col justify-center items-center text-sm w-full min-h-[300px] h-full space-y-4">
            <h2 className={`font-bold underline`}>{"Scatter Plot"}</h2>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                    data={[
                        {
                            color: 'blue.5',
                            name: 'Group 1',
                            data: aggregatedData
                        }
                    ]}
                    dataKey={{ x: xAttribute, y: yAttribute }}
                    xAxisLabel={xAttribute}
                    yAxisLabel={yAttribute}
                    withTooltip
                />
            </ResponsiveContainer>
        </div>
    );
}