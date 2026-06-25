import Papa from "papaparse";
import { deprecate } from "util";
import { SqlValue } from "sql.js";

[deprecate]
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
    meta_url: string,
    sc: string,
    unity_version: string,
    dependencies: string[]
}

export interface Project {
    id: number;
    path: string;
    name: string;
    //visibility: boolean;
    platform: string[];
    target_platform: string;
    input_control: string[];
    description: string;
    thumbnail: string;
    video: string;
    meta_url: string;
    yt_id: string,
    sc: string;
    unity_version: string;
    dependencies: string[];
}

export function DB2Project(values: SqlValue[]) {
    return {
        id: values[0] as number,
        path: values[1] as string,
        name: values[2] as string,
        //visibility: (values[3] as number) === 1,
        platform: (values[4] as string).split(",").map(x => x.trim()).filter(x => x !== ""),
        target_platform: values[5] as string,
        input_control: (values[6] as string).split(",").map(x => x.trim()).filter(x => x !== ""),
        description: values[7] as string,
        thumbnail: values[8] as string,
        video: values[9] as string,
        meta_url: values[10] as string,
        yt_id: values[11] as string,
        sc: values[12] as string,
        unity_version: values[13] as string,
        dependencies: (values[14] as string).split(",").map(x => x.trim()).filter(x => x !== ""),
    }
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