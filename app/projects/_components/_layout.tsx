'use client'

import { Row } from "@/app/api/data_parsing";
import { Header } from "../page";
import { ItemValue, ProjectCard } from "./_components";
import { decryptAESGCM } from "@/app/api/aes";
import { useRef, useState } from "react";

export function ProjectHeader({ name }: {
    name: string
}) {
    return <Header
        title={<>
            <h1>Project</h1>
            <h1>{name}</h1>
        </>}
    />
}

export function ProjectInfo({ data }: {
    data?: Row
}) {
    if (data == undefined) return <></>
    return <div className="flex shrink-0 flex-row-reverse not-lg:flex-col w-full justify-between gap-5">
        <div className="grow">
            <ProjectCard title="Informasi Project" className="lg:h-[494px]">
                <ItemValue label="Nama">
                    <p>{data?.name}</p>
                </ItemValue>
                <ItemValue label="Deskripsi">
                    <p className="max-h-[200px] not-lg:max-h-[250px] overflow-y-auto">
                        {data?.description || "-"}
                    </p>
                </ItemValue>
                <ItemValue label="Unity Version">
                    <p>{data.unity_version}</p>
                </ItemValue>
                <ItemValue label="Support Platform">
                    <div className="flex flex-row flex-wrap gap-1">
                        {data?.platform.map((item, index) => (
                            <p className="item-type" key={index}>{item}</p>
                        ))}
                    </div>
                </ItemValue>
                <ItemValue label="Target Platform">
                    <p className="item-type">{data.target_platform}</p>
                </ItemValue>
                {data.input_control.length > 0
                ? <ItemValue label="Support Input">
                    <div className="flex flex-row flex-wrap gap-1">
                        {data?.input_control.map((item, index) => (
                            <p className="item-type bg-orange-900 border-orange-700 text-orange-300" key={index}>{item}</p>
                        ))}
                    </div>
                </ItemValue>
                : <></>}
            </ProjectCard>
        </div>
        <div className="lg:h-[494px]">
            <ProjectCard title="Video Demo">
                {data?.video != "" ? <iframe className="aspect-video lg:w-[720px]"
                    title="YouTube video player"
                    src={data?.video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                    referrerPolicy="strict-origin-when-cross-origin"
                /> : <div className="w-[720px] h-full">Tidak ada Video</div>}
            </ProjectCard>
        </div>
    </div>
}

export function ProjectRequiretment({ data }: {
    data?: Row
}) {
    return <div className="flex shrink-0 flex-row-reverse not-lg:flex-col w-full justify-between gap-5">
        <div className="grow flex flex-col lg:h-[494px] justify-between gap-5">
            <ProjectCard title="Syarat Project" className="grow">
                <p>Sebelum Membuka Project harap untuk memenuhi syarat2 berikut ini:</p>
                <ul className="text-list">
                    <li>
                        <span className="link">Koneksi Internet</span> sangat wajib
                    </li>
                    <li>
                        Tentu saja sudah Install <a className="link" href="https://unity.com/download" target="_blank">
                            Unity {data?.unity_version}
                        </a>
                    </li>
                    {data?.dependencies.find(x => x === "7zip") != null ? <li>
                        <a className="link" href="https://7-zip.org/download.html" target="_blank">7zip</a> Untuk Extract Project
                    </li> : <></>}
                    {data?.dependencies.find(x => x === "git") != null ? <li>
                        <a className="link" href="https://git-scm.com/downloads/win" target="_blank">GitHub Command Line</a> Untuk menginstall dependencies external
                    </li> : <></>}
                    {data?.dependencies.find(x => x === "fmod") != null ? <li>
                        <span className="text-tag">(Opsional)</span><br />
                        <a className="link" href="https://www.fmod.com/download#fmodstudio" target="_blank">FMOD Studio 2.03</a> Jika ingin edit audionya sendiri
                        <br /><span className="text-alert">(Memerlukan Pemahaman dasar tentang audio)</span>
                    </li> : <></>}
                </ul>
            </ProjectCard>
            <ProjectCard title="Cara Membuka Project" className="grow">
                <ul>
                    <li>Extract File 7z yang ada di folder Project</li>
                    <li>Buka Unity Hub</li>
                    <li>{"Klik Add > Add project from disk"}</li>
                    <li>Arahkan Ke Folder Hasil Extract Tadi</li>
                    <li>Setelah Project Berhasil terbuka,</li>
                    <li>Buka Folder Scene</li>
                    <li>Klik 2x salah satu scene yang tersedia</li>
                </ul>
            </ProjectCard>
        </div>
        <div>
            <ProjectCard title="Video Cara Membuka Project">
                <iframe className="aspect-video lg:w-[720px]"
                    title="YouTube video player"
                    src="https://www.youtube.com/embed/KF7S33FTgfQ"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </ProjectCard>
        </div>
    </div>
}

export function ProjectSourceCode() {
    return <div className="flex shrink-0 flex-row w-full not-lg:flex-col justify-between gap-5">
        <div className="flex flex-col justify-between gap-5">
            <ProjectCard title="Persyarata hardware untuk membuka Project" bodyClassName="flex-row not-lg:flex-col">
                <div className="flex flex-col flex-grow basis-1/2 gap-1">
                    Minimum:
                    <ul className="text-list">
                        <li>OS: Windows 7 (x64)</li>
                        <li>CPU: Intel i3 gen7 / Ryzen3 2000</li>
                        <li>RAM: 8GB</li>
                        <li>GPU: Intel HD / Radeon Vega</li>
                    </ul>
                </div>
                <div className="flex flex-col flex-grow basis-1/2 gap-1">
                    Rekomendasi:
                    <ul className="text-list">
                        <li>OS: Windows 11 (x64)</li>
                        <li>CPU: Intel i5 gen10 / Ryzen5 5000 series</li>
                        <li>RAM: 16GB</li>
                        <li>GPU: GTX1660 Super</li>
                    </ul>
                </div>
            </ProjectCard>
            <ProjectCard title="Cara Update Project" className="grow">
                <ul>
                    <li>Download file Update</li>
                    <li>Buka Unity Project sebelumnya</li>
                    <li>Klik Assets / Import Package / Custom Package / File Update (contoh Update 1.1.unitypackage)</li>
                    <li>dan Klik Import</li>
                </ul>
                <span className="text-warning flex flex-col gap-3">
                    untuk update, pastikan di lakukan secara urut versi <br/>
                    contohnya, sebelum update versi 1.2, harus sudah update dulu ke 1.1 projectnya, <br/>
                    jika tidak di lakukan secara urut, nanti file nya akan tidak sinkron antara file baru ama
                    file lama yang menyebabkan error
                    <span className="text-tag">Tapi Jika File berbentuk zip, langsung saja copy paste dan timpa project lama</span>
                </span>
            </ProjectCard>
        </div>
        <div>
            <ProjectCard title="Penjelasan beberapa Folder di dalam Project">
                <ul>
                    <li>
                        <div>
                            <span className="text-alert">Data:</span>
                            <p>Berisi File Mentah (Raw) yang akan di gunakan pada project</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className="text-alert">Prefab:</span>
                            <p>Berisi File Pre-Set yg sudah di konfigurasi </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className="text-alert">Scenes:</span>
                            <p>Berisi Scene/level yang tersedia </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className="text-alert">Scripts:</span>
                            <p>Berisi Logika Utama yg digunakan di dalam Project</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className="text-alert">Resourcess:</span>
                            <p>
                                Directory yg akan di baca Unity secara internal dengan Path yg relatif serta Naming Sensitive <br/>
                                <span className="text-warning">bagian ini jangan pernah di sentuh, krn bisa menimbulkan error yg luas jika salah langkah</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className="text-alert">KenTank:</span>
                            <p>Berisi Asset atau Tools pre-build yang telah dikembangkan secara internal dan bersifat OpenSource</p>
                            <p>boleh di rename dengan nama sendiri <span className="text-tag">(jika perlu)</span></p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className="text-alert">External Assets | Plugins: <span className="text-tag">(Jika Ada)</span></span>
                            <p>
                                Berisi External Asset dari luar seperti GitHub, Asset Store, dan lainnya. <br/>
                                bisa digunakan sebagai sumber atau referensi untuk laporan <br/>
                                <span className="text-warning">Jangan di perjual belikan untuk di bagian ini, krn lisensi di lindungi hukum Internasional, segala tindakan ilegal setelah di tangan pembeli, bukan lagi tanggung jawab kami</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className="text-alert">FMOD: <span className="text-tag">(Jika Ada)</span></span>
                            <p>
                                Berisi Project Third-Party untuk Audio Studio yg terhubung secara langsung dengan Unity, mengunakan Aplikasi External <br/> 
                                tujuan nya agar suara yg di hasilkan lebih baik dari pada Audio bawaan Unity nya <br/>
                                <span className="text-warning">memerlukan pemahaman teknis tentang audio softwaring untuk edit file ini</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </ProjectCard>
        </div>
    </div>
}

export function ProjectDownloader({ data }: {
    data?: Row
}) {
    const key = useRef<HTMLInputElement>(null);
    const sc = data?.sc??"null";

    const [msg, setMsg] = useState<string>();

    async function DecryptLink(from?:string, password?:string) {
        try {
            if (key.current) key.current.disabled = true;
            const result = await decryptAESGCM(from??"", password??"");
            setMsg(undefined);
            window.open(result, '_blank');
        } catch(ex) {
            setMsg("Key Invalid or Wrong!")
        } finally {
            if (key.current) {
                key.current.value = "";
                key.current.disabled = false;
            }
        }
    }
    
    return <div>
        <ProjectCard title="Download Source Code">
            <p>Silahkan Dowload Source Codenya dengan klik Tombol di bawah ini, dengan key yang telah kami berikan sebelumnya</p>
            <span className="text-warning">{msg}</span>
            <div className="flex flex-row not-sm:justify-between w-full gap-1">
                <div className="border border-gray-500 flex flex-row items-center p-1 rounded-md grow">
                    <input ref={key} type="password" placeholder="Unlock Key"
                        className="outline-none size-full" />
                </div>
                <button className="button hover:scale-100" onClick={() => DecryptLink(sc, key.current?.value)}>Download</button>
            </div>
        </ProjectCard>
    </div>
}

export function ProjectMoto() {
    return <div className="card items-center">
        <span>⭐ Jasa Pembuatan Game/Puzzle/AR/VR/Edukasi untuk tugas kuliah paling murah se-Indonesia ⭐</span>
        <span>Sudah beroprasi dan terpercaya secara amanah sejak 2021</span>
    </div>
}

export function ProjectMyAds() {

    const items = [
        {label: "Mudik Rush", link: "https://play.google.com/store/apps/details?id=com.KenTank.MudikRush"},
        {label: "Pocket Game: Bouncer", link: "https://play.google.com/store/apps/details?id=com.KenTank.Bouncer"},
        {label: "Lari Masbro", link: "https://play.google.com/store/apps/details?id=com.kentank.larimasbro"},
        {label: "Zombie Survival", link: "https://play.google.com/store/apps/details?id=com.KenTank.ZombieSurvival"},
        {label: "Bebek Panjaaaang", link: "https://play.google.com/store/apps/details?id=com.KenTank.DuckW"},
        {label: "Balancing Marble", link: "https://play.google.com/store/apps/details?id=com.KenTank.BalancingMarbles"},
        {label: "Portal Runner", link: "https://play.google.com/store/apps/details?id=com.kentank.portalrunner"},
        {label: "Space Survival", link: "https://play.google.com/store/apps/details?id=com.kentank.spacesurvival"},
    ]

    return <>
    <ProjectCard title="Hay Orang Baik">
        <p>
            Bantu dukung game saya bang, dengan download atau paling tidak mengunjungi link play store saya
            <a className="link" href="https://play.google.com/store/apps/dev?id=8519893492080177777" target="_blank"> disini</a> atau
            bisa langsung klik link di bawah ini
        </p>
        <ul>
            {items.map((item,index) => (
                <li key={index}>
                    <a className="link" href={item.link} target="_blank">
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
        <p>
            Terimakasih orang baik 😊🙏
        </p>
    </ProjectCard>
    </>
}