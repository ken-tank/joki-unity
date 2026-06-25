import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { Row, TransformField } from "@/app/api/data_parsing";

// Get Data
const csvPath = path.join(process.cwd(), "public/data.csv");
const csvText = fs.readFileSync(csvPath, "utf8");

export const data = Papa.parse<Row>(csvText, {
  header: true,
  skipEmptyLines: true,
  transform(value, field) {
    return TransformField(value, field);
  },
}).data.filter(x => x.visibility = true);