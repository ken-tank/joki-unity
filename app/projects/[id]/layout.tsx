import type { Metadata } from "next";
import "../../globals.css";
import { data } from "./data";

export async function generateMetadata({params}: {params: {id:string}}): Promise<Metadata> {
    const wrap = await params;
    const row = data.find(x => x.id === wrap.id);

    if (!row) return { title: "Not Found" };

    return {
        title: row.name,
        openGraph: {
            title: row.name,
            images: row.thumbnail,
            url: row.video,
            videos: row.video,
        },
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body>
                {children}
            </body>
        </html>
    );
}