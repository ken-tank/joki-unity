import Papa from "papaparse";

export interface Row {
    id: string,
    visibility: boolean,
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

export function TransformField(value: string, field: string | number) {
    if (value != undefined 
      && field === "platform" 
      || field === "input_control" 
      || field === "dependencies"
    ){
      return value.split(',').map(item => item.trim()).filter(x => x != "").sort();
    } else if(value != undefined
      && field === "visibility"
    ){
      return value.toLowerCase() === "true" ? true : false;
    }
    else return value;
}