import Papa from "papaparse";

export interface Row {
    id: string,
    name: string,
    platform: string[],
    target_platform: string,
    input_control: string[],
    description: string,
    thumbnail: string,
    video: string,
    sc: string,
    unity_version: string,
    dependencies: string[]
}

export async function GetData(id: string): Promise<Row|null> {
    try {
        const response = await fetch("/data.csv");
        const text = await response.text();

        const parsed = Papa.parse<Row>(text, {
            header: true,
            skipEmptyLines: true
        });

        if (parsed.errors.length > 0) {
            return null;
        }

        return parsed.data.find(x => x.id === id) || null;
    } catch (err) {
        console.log(err);
        return null;
    }
}