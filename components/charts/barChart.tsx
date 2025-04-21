"use client";

import { Data } from "@/types/data";
import { BarChart } from "@mantine/charts";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";

export default function Bar({ data }: { data: Data[] }) {

    return (
        <div className="flex flex-col justify-center items-center text-sm w-full min-h-[300px] h-full space-y-4">
            <h2 className={`font-bold underline`}>{"Faux Title"}</h2>
            <ResponsiveContainer width="90%" height="90%">
                <BarChart
                    data={data}
                    dataKey="name"
                    tickLine="y"
                    series={[
                        { name: "wine1", color: "blue" },
                        { name: "wine2", color: "red" },
                    ]}
                    textColor="black"
                />
            </ResponsiveContainer>
        </div>
    );
}
