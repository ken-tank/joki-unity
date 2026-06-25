import type { Metadata } from "next";
import "../../globals.css";
import initSqlJs from "sql.js";
import path from "path";
import { readFileSync } from "fs";
import { cache } from "react";
import { DB2Project, Project } from "@/app/api/data_parsing";


const getProjects = cache(async (): Promise<Project[]> => {
    const sql = await initSqlJs({
        locateFile: () => path.join(process.cwd(), "public", "sql-wasm.wasm"),
    });

    const b_buffer = readFileSync(path.join(process.cwd(), "public", "data.db"));
    const b_uint8 = new Uint8Array(b_buffer);
    const db = new sql.Database(b_uint8);
    
    const projects = db.exec("select * from projects").flatMap(x => x.values.map(y => DB2Project(y)));
    
    db.close();
    return projects;
});

interface Props {
    params: Promise<{ id: string }>;
    children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const wrap = await params;
    const allProjects = await getProjects();
    
    const row = allProjects.find(x => x.path === wrap.id);

    if (!row) return { title: "Not Found" };

    return {
        title: row.name,
        openGraph: {
            title: row.name,
            images: row.yt_id ? `https://img.youtube.com/vi/${row.yt_id}/sddefault.jpg` : undefined,
            videos: row.yt_id ? `https://www.youtube.com/watch?v=${row.yt_id}` :  undefined,
            url: `https://ken-tank.github.io/joki-unity/projects/${row.path}`,
            siteName: "KenTank Joki Project",
        },
    };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="id">
            <body>
                {children}
            </body>
        </html>
    );
}