'use client'

import React, { useEffect, useRef, useState } from "react"
import Papa from 'papaparse';
import { Row, TransformField } from "../api/data_parsing";
import { ProjectCard } from "./_components/_components";
import { contact_redirect } from "../page";

export function Header({title, action}: {
    title?: React.ReactElement,
    action?: React.ReactElement,
}) {
    return <>
    <div className="flex flex-row justify-between items-center shrink-0 h-[80px] shadow-2xl px-10 z-10">
        <div className="flex flex-row gap-2">
            {title}
        </div>
        <div className="flex flex-row-reverse gap-2">
            {action}
        </div>
    </div>
    </>
}

export default function Projects() {
    
    const active_page = useRef(0);
    const renderData = useRef<Row[]>([]);
    const totalPage = useRef(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|undefined>();

    const max_item = 8;

    useEffect(() => {

        const parms = new URLSearchParams(window.location.search);
        const parms_page = parms.get("page");
        if (parms_page) {
            const v = Math.max(0, parseInt(parms_page));
            active_page.current = v-1;
        }

        fetch("/joki-unity/data.csv")
        .then(result => result.text())
        .then(text => {
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                transform(value, field) {
                    return TransformField(value, field);
                },
                complete: (result) => {
                    if (result.errors.length > 0) {
                        setError(result.errors[0].message);
                    } else {
                        const resultData = (result.data as Row[]).filter(x => x.visibility == true);
                        totalPage.current = resultData.length;
                        const startIndex = Math.max(0, max_item * active_page.current);
                        const stopIndex = startIndex + max_item;
                        renderData.current = resultData.slice(startIndex, stopIndex);
                    }
                    setLoading(false);
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
    },[])

    function DataRender() {
        
        function Cell({index}: {index:number}) {
            const data: Row | undefined = renderData.current[index];
            if (data == undefined) return <div></div>
            else return <Item data={data}/>
        }

        if (loading) return <div>Loading...</div>
        else if (error != undefined) return <div>{error}</div>
        else return <>
        {Array.from({length: max_item}).map((_, index) => (
            <Cell key={index} index={index}/>
        ))}
        </>
    }

    function CreatePagination() {
        if (loading && error == undefined) return <span>...</span>;
        else if (totalPage.current > 1) {
            let page_total = Math.floor(totalPage.current/max_item);
            const more = totalPage.current%max_item > 0;
            if (more) page_total += 1;
            return <>
            <div className="flex flex-row justify-center items-center lg:pb-10 gap-2 scale-80 not-lg:scale-70">
                {active_page.current > 0 ? <a href={`/joki-unity/projects?page=1`} className="button bg-secondary">First</a> : <></>}
                {active_page.current > 0 ? <a href={`/joki-unity/projects?page=${active_page.current}`} className="button bg-secondary">{"<"}</a> : <></>}
                {Array.from({length: page_total}).map((_, index) => (
                    <a key={index} href={`/joki-unity/projects?page=${index+1}`}
                    className={
                        "button" +
                        (index === active_page.current ? " brightness-130 -translate-y-1" : " brightness-100")
                    }
                    >
                        {index + 1}
                    </a>
                ))}
                {active_page.current+1 < page_total ? <a href={`/joki-unity/projects?page=${active_page.current+2}`} className="button bg-secondary">{">"}</a> : <></>}
                {active_page.current+1 < page_total ? <a href={`/joki-unity/projects?page=${page_total}`} className="button bg-secondary">Last</a> : <></>}
            </div>
            </>
        }
        else return <></>
    }

    function Item({data}:{
        data?: Row
    }) {
        const url = "/joki-unity/projects/" + data?.id||"404";
        const label = data?.name||"No Name";
        const imgData = data?.thumbnail||undefined;
        const platformIcon: { [key: string]: string} = {
            'Windows': "/joki-unity/icons/platform/windows.png",
            'Android': "/joki-unity/icons/platform/android.png",
            'WebGL': "/joki-unity/icons/platform/webgl.png",
            'Linux': "/joki-unity/icons/platform/linux.png",
        }
        const platforms = data?.platform.map(x => platformIcon[x]);
        return <>
        <div className="relative w-full h-[350px] not-lg:h-[200px] bg-panel rounded-md shadow-xl overflow-hidden group">
            <img src={imgData} alt="No Preview" className="absolute h-full w-full flex justify-center items-center object-cover group-hover:scale-110 group-hover:blur-sm group-hover:brightness-50 duration-300"/>
            <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-between">
                <a href={url??""} className="font-bold text-lg not-lg:text-sm bg-black/70 p-4 max-h-[80px] not-lg:max-h-[60px] overflow-hidden line-clamp-2">{label??"No Name"}</a>
                <div className="flex flex-col p-2 group-hover:p-4 gap-2 bg-black/50 duration-300">
                    <div className="h-0 group-hover:h-[130px] not-lg:group-hover:h-[80px] not-lg:text-xs overflow-auto duration-300">
                        <p className="line-clamp-3">{data?.description||"No Description!"}</p>
                    </div>
                    <div className="flex flex-row-reverse justify-between items-end w-full not-lg:text-xs">
                        <div>
                            <a href={url??""}>Lihat Semua...</a>
                        </div>
                        <div className="flex flex-row flex-wrap gap-2 h-full not-lg:hidden">
                            {platforms?.map((item, index) => (
                                item != "" ? <img key={index} src={item} alt="" className="aspect-square h-[24px]" /> : <></>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    }

    return <>
    <div className="flex flex-col w-full h-screen">
        <Header 
            title={<>
                <a href="/joki-unity" className="font-bold">{"<"}</a>
                <h1>Project List</h1>
            </>}
        />
        <div className="flex flex-row not-lg:flex-col lg:grow lg:justify-between items-center lg:overflow-hidden">
            <div className="flex flex-col not-lg:flex-col-reverse lg:grow lg:h-full not-lg:w-full overflow-y-auto">
                <div className="lg:grow p-10 not-lg:p-5">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] not-lg:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] place-self-auto place-items-center gap-10 not-lg:gap-5">
                        <DataRender/>
                    </div>
                </div>
                <CreatePagination/>
            </div>
            <div className="flex flex-col lg:shrink-0 lg:h-full lg:w-[350px] not-lg:w-full pt-10 pr-10 pb-10 not-lg:p-5">
                <div>
                    <ProjectCard title="Kontak Developer" bodyClassName="overflow-y-visible">
                        <div className="text-center pb-4">
                            <p>Ingin membeli salah satu project yang terlampir di sini?</p>
                            <p>Boleh... harga mulai dari 80rb an lho</p>
                        </div>
                        <p>Silahkan Kontak kami untuk menanyakan ketersediaan dan harga</p>
                        <div className="flex flex-row gap-3">
                            <a href={contact_redirect} className="button button-shade">HUBUNGI KAMI</a>
                        </div>
                    </ProjectCard>
                </div>
            </div>
        </div>
    </div>
    </>
}