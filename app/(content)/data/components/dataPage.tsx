"use client";

import ChartChangeButton from "@/components/buttons/chartChangeButton";
import FilterButton from "@/components/buttons/filterButton";
import Header from "@/components/nav/header";
import BarChart from "@/components/charts/barChart";
import { Data } from "@/types/data";
import { useEffect, useState } from "react";
import { ComboboxItem } from "@mantine/core";
import { FormatData } from "@/utils/formatData";
import Scatter from "@/components/charts/scatterChart";

export default function DataPage() {

    const [csvData, setCsvData] = useState<Data[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [xAttribute, setXAttribute] = useState("Alcohol");
    const [yAttribute, setYAttribute] = useState("Quality");
    const [chartType, setChartType] = useState("Scatter");

    const attributes = [
        "quality",
        "fixed_acidity",
        "volatile_acidity",
        "citric_acid",
        "residual_sugar",
        "chlorides",
        "free_sulfur_dioxide",
        "total_sulfur_dioxide",
        "density",
        "pH",
        "sulphates",
        "alcohol",
    ];

    const formatAttributeName = (name: string) => {
        return name.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const attributeOptions = attributes.map(attr => 
        formatAttributeName(attr)
    );

    const handleFilter = (filters: string, which: string) => {
        if (which === 'x') {
            setXAttribute(filters)
        } else {
            setYAttribute(filters)
        }
    };

    const handleChart = (which: string) => {
        setChartType(which);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await FormatData() as { data: Data[], message: string }
            if (!data) {
                setError('Issue with data return');
            }
            if (data.message !== '') {
                setError(data.message);
            } else {
                setCsvData(data.data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        loading ? (
            <div>
                Loading...
            </div>
        ) : error ? (
            <div>
                {error}
            </div>
        ) : (
            <main className="flex flex-col justify-start items-center w-screen h-screen overflow-hidden">
                <Header />
                <section className="p-2 flex flex-col justify-start items-center w-full h-full overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-row justify-between px-8 py-2 items-center w-full h-content">
                        <ChartChangeButton handleChart={handleChart} chart={chartType} />
                        <div className="flex flex-row justify-end space-x-7 items-center w-1/2">
                            <FilterButton
                                dataTitles={attributeOptions}
                                handleFilter={handleFilter}
                                currentFilter={xAttribute}
                                which={'x'}
                            />
                            <FilterButton
                                dataTitles={attributeOptions}
                                handleFilter={handleFilter}
                                currentFilter={yAttribute}
                                which={'y'}
                            />
                        </div>
                    </div>
                    {chartType === "Bar" ? <BarChart data={csvData} /> : chartType === 'Scatter' ? <Scatter data={csvData} xAttribute={xAttribute} yAttribute={yAttribute} /> : <p>Line Chart</p>}
                </section>
            </main>
        )
    );
}
