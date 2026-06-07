'use client';

import { useEffect, useState } from "react";
import initSqlJs, {Database} from "sql.js";

interface Item {
	id: number;
    path: string;
    name: string;
    visibility: number;
    platform: string;
    target_platform: string;
    input_control: string;
    description: string;
    thumbnail: string;
    video: string;
    meta_url: string;
    sc: string;
    unity_version: string;
    dependencies: string;
}

export default function index() {

    //const [db, setDB] = useState<Database|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [item, setItem] =  useState<Item[]>([]);

    useEffect(() => {
        async function init() {
            const sql = await initSqlJs({
                locateFile: () => "/joki-unity/sql-wasm.wasm",
            });
            const response = await fetch('/joki-unity/data.db');
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            const db = new sql.Database(data);
            //setDB(db);
            const resItems = db.exec("select * from projects");
            const mappedItems: Item[] = resItems.flatMap(x => x.values.map((y) => ({
                id: y[0] as number,
                path: y[1] as string,
                name: y[2] as string,
                visibility: y[3] as number,
                platform: y[4] as string,
                target_platform: y[5] as string,
                input_control: y[6] as string,
                description: y[7] as string,
                thumbnail: y[8] as string,
                video: y[9] as string,
                meta_url: y[10] as string,
                sc: y[11] as string,
                unity_version: y[12] as string,
                dependencies: y[13] as string,
            })));
            setItem(mappedItems);
            setLoading(false);
        }

        init();
    },[]);

    const loadingContent = <div>
        Loading...
    </div>;

    const resultContent = <div>
        {item.map((x, i) => (
            <span key={i}>{x.name}</span>
        ))}
    </div>;

    return loading ? loadingContent : resultContent;
}