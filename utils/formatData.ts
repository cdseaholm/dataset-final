import { Data } from "@/types/data";
import Papa, { ParseResult } from "papaparse";

export async function FormatData() {

    let errMessage = '';
    let csvDataToReturn = [] as Data[]

    try {
        const response = await fetch('/wine.csv');
        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Could not read the file');
        }
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvText = decoder.decode(result.value);

        Papa.parse<Data>(csvText, {
            header: true,
            complete: (results: ParseResult<Data>) => {
                csvDataToReturn = results.data
            },
            error: (err: any) => {
                errMessage = err.message;
            },
        });
        return { data: csvDataToReturn, message: errMessage }
    } catch (e: any) {
        errMessage = e.message;
        return { data: csvDataToReturn, message: errMessage }
    }

}