import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { Row } from "@/app/api/data_parsing";

// Get Data
const csvPath = path.join(process.cwd(), "public/data.csv");
const csvText = fs.readFileSync(csvPath, "utf8");

export const data = Papa.parse<Row>(csvText, {
  header: true,
  skipEmptyLines: true,
  transform(value, field) {
    if (value != undefined && field === "platform" || field === "input_control" || field === "dependencies"){
      return value.split(',').map(item => item.trim()).filter(x => x != "").sort();
    }
    else return value;
  },
}).data;