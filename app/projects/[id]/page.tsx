import { ProjectCard } from "../_components/_components";
import { ProjectDownloader, ProjectHeader, ProjectInfo, ProjectMoto, ProjectMyAds, ProjectRequiretment, ProjectSourceCode } from "../_components/_layout";
import { data } from "./data";

export async function generateStaticParams() {
  return data.map(p => ({id: p.id}))
}

export default async function Index({params}: {params: {id:string}}) {
    const wraped = await params;
    const row = data.find(x => x.id === wraped.id)
    return <>
    <div className="flex flex-col w-full h-screen">
        <ProjectHeader name={row?.name || "No Name"} />
        <div className="flex flex-row not-lg:flex-col grow justify-between gap-5 items-center lg:overflow-hidden">
            <div className="flex flex-col lg:grow h-full not-lg:w-full gap-5 overflow-y-auto pt-10 pl-10 pb-10 pr-2 not-lg:p-5">
                <ProjectInfo data={row} />
                <div className="card lg:hidden">
                    <p>Download Source Code ada di bawah</p>
                </div>
                <ProjectRequiretment data={row} />
                <ProjectSourceCode />
                <ProjectMoto />
            </div>
            <div className="flex flex-col shrink-0 lg:h-full overflow-y-auto lg:w-[500px] gap-5 pt-10 pr-10 pb-10 not-lg:p-5">
                <div>
                    <ProjectCard title="Perhatian">
                        Pastikan mengunakan versi Unity sesuai project, agar tidak terjadi error saat mencoba membuka project <br/>
                        dan pastikan terhubung dengan koneksi internet untuk mendownload package yang di perlukan secara
                        otomatis
                        <span></span>
                        <span className="text-warning">
                            *Hanya bisa di buka via Unity Hub, jika di copy paste sendiri, maka akan terjadi error karena
                            dependecies dan liberary yang di perlukan tidak dapat terinstall secara normal
                        </span>
                    </ProjectCard>
                </div>
                <ProjectMyAds />
                <ProjectDownloader data={row} />
            </div>
        </div>
    </div>
    </>
}