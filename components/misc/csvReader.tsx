'use client'

import React, { useState, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import { Data } from '@/types/data';
import Header from '../nav/header';
import { FormatData } from '@/utils/formatData';

const CsvReader: React.FC = () => {
    const [csvData, setCsvData] = useState<Data[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        loading ? (
            <div className='flex flex-col justify-start items-center w-screen h-screen overflow-y-auto overflow-x-hidden p-1'>
                Loading...
            </div>
        ) : (
            <div className='flex flex-col justify-start items-center w-screen h-screen overflow-y-auto overflow-x-hidden p-1'>
                <Header />
                <h1 className='text-center underline font-semibold'>CSV Data</h1>
                <table>
                    <thead>
                        <tr>
                            {csvData[0] && Object.keys(csvData[0]).map((key) => (
                                <th key={key} className='w-[9%]'>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                    <td key={index} className='w-[8%] px-1 border border-gray-500'>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    );
};

export default CsvReader;