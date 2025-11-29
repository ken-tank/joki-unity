import React from "react";

const loremIpsum = "Bacon ipsum dolor amet bresaola pork belly brisket chislic. Cupim brisket shank flank burgdoggen salami spare ribs sausage kevin t-bone jowl. Leberkas drumstick turducken jerky frankfurter flank doner ground round ribeye pork loin shankle tenderloin. Alcatra short loin venison swine pork belly beef ribs. Flank shankle jerky burgdoggen ball tip buffalo.";
const slogan = "Kami mengerti budget Anda! Sebagai penyedia jasa joki tugas Unity, kami berkomitmen memberikan solusi akademik berkualitas tinggi yang spesial dirancang untuk kantong mahasiswa. Proyek Anda dijamin cepat selesai, bug-free, dan sesuai standar dosen, tanpa perlu mengorbankan uang saku. Dapatkan proyek Unity terbaik di kelasnya dengan jaminan harga termurah yang paling bersahabat bagi pelajar. Lihat portofolio kami dan buktikan sendiri!";

export const contact_redirect = "https://wa.me/6281238753047";

export function CheckTrueIcon() { 
    return <svg className="shrink-0"
    xmlns="http://www.w3.org/2000/svg" 
    height="24px"
    width="24px" 
    fill="#75FB4C"
    >
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/>
    </svg>
}

export function CheckFalseIcon() {
    return <svg className="shrink-0"
    xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    width="24px" 
    fill="#EA3323">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
    </svg>
}

export function HomePage() {
    return <>
    <div className="relative flex flex-row-reverse not-lg:flex-col justify-between items-center h-screen w-full">
        <div className="flex flex-col lg:w-[50%] not-lg:h-full items-center justify-center">
            <div className="flex flex-col gap-3 w-[500px] not-lg:w-full not-lg:px-10">
                <span className="text-3xl">Joki Tugas Unity</span>
                <p>{slogan}</p>
                <div className="flex felx-row gap-3">
                    <a href={contact_redirect} className="button button-shade">HUBUNGI KAMI</a>
                    <a href="./projects" className="button bg-secondary">Lihat Portofolio</a>
                </div>
            </div>
        </div>
        <div className="lg:w-[50%] flex items-center -z-10 justify-center size-full border">
            cara membuat splashart yg menarik gimana bjir
        </div>
        <img src="images/landing-page-bg.jpg" alt="" className="absolute size-full object-cover -z-20" />
    </div>
    </>
}

export function ProductPage() {

    function Item({label, children, img}: Readonly<{
        label?: string,
        children?: React.ReactNode,
        img?: string,
    }>) { 
        return <>
        <div className="flex flex-col w-[350px] not-lg:w-full items-center gap-2">
            <img src={img} alt="" className="h-[100px] not-lg:h-[100px] object-contain" />
            <span>{label??"Label"}</span>
            <p className="max-h-[100px] overflow-y-auto text-center">{children}</p>
        </div>
        </>
    }

    return <>
    <div className="flex flex-col lg:justify-evenly gap-10 items-center w-full lg:h-screen p-10 lg:p-32">
        <span className="text-3xl pb-10 text-center">Games yang kami Tawarkan</span>
        <div className="flex flex-row not-lg:flex-col w-full lg:justify-evenly not-lg:gap-10">
            <Item label="Android AR" img="/joki-unity/icons/ar.png">Implementasi teknologi Augmented Reality (AR) di perangkat Android. Proyek mencakup pelacakan gambar/permukaan, integrasi Unity AR Foundation, dan rendering objek 3D di dunia nyata. Sempurna untuk tugas inovatif.</Item>
            <Item label="Android VR" img="/joki-unity/icons/vr.png">Pembuatan pengalaman Virtual Reality (VR) yang imersif dan optimal untuk perangkat Android (misalnya Google Cardboard atau headset mobile). Fokus pada interaksi 3D, navigasi, dan performa tinggi.</Item>
            <Item label="Puzzle" img="/joki-unity/icons/puzzle.png">Pengembangan game puzzle yang menantang dan logis. Kami membuat mekanisme unik, sistem leveling progresif, dan desain antarmuka yang intuitif. Cocok untuk menguji kemampuan logika pemrograman.</Item>
        </div>
        <div className="flex flex-row not-lg:flex-col w-full lg:justify-evenly not-lg:gap-10">
            <Item label="2D Games" img="/joki-unity/icons/2d.png">Pengembangan game platformer, side-scroller, atau top-down 2D. Proyek mencakup sistem sprite animation, fisika 2D, tilemaps, dan desain level yang mendalam. Cepat selesai dengan kualitas terbaik.</Item>
            <Item label="3D Games" img="/joki-unity/icons/3d.png">Pembuatan game dengan lingkungan tiga dimensi yang kompleks. Meliputi desain level 3D, implementasi mekanik kamera, sistem pathfinding AI, dan rendering grafis yang optimal.</Item>
            <Item label="First Person" img="/joki-unity/icons/first person.png">Pengembangan game sudut pandang orang pertama (First Person Shooter atau FPP). Termasuk sistem senjata, kontrol karakter yang realistis, raycasting, dan implementasi AI musuh yang dinamis.</Item>
        </div>
    </div>
    </>
}

export function PricingPage() {

    function Item({price, title, features}: {
        price?: string,
        title?: string,
        features?: {label:string, mark:boolean}[],
    }) {
        return <>
        <div className="bg-panel p-8 w-[500px] not-lg:h-[400px] h-[300px] not-lg:w-full shadow-2xl flex flex-col justify-between rounded-md">
            <span className="text-2xl">{title??"Title"}</span>
            <div className="flex flex-col border-t border-gray-600 py-2 h-[120px] not-lg:h-[200px] overflow-y-auto">
                {features?.map((item, index) => (
                    <div key={index} className="flex flex-row gap-3">
                        {item.mark ? <CheckTrueIcon /> : <CheckFalseIcon />}
                        <span className="text-gray-400 font-normal">{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="text-end">
                <span className="text-gray-400">Mulai dari</span>
                <div className="flex flex-row items-end justify-end text-3xl font-bold gap-1">
                    <div className="text-gray-400 text-2xl">Rp</div>
                    <div>{price}</div>
                </div>
            </div>
        </div>
        </>
    }

    return <>
    <div className="lg:h-screen flex flex-col gap-10 items-ed lg:justify-evenly p-10">
        <span className="text-3xl pb-10 text-center">Harga Bisa di Nego</span>
        <div className="flex flex-row not-lg:flex-col w-full lg:justify-evenly items-center not-lg:gap-10">
            <Item price="120.000" title="AR" features={[
                {label: "5 Object AR", mark: true},
                {label: "Pengerjaan paling lambat 7 hari", mark: true},
                {label: "Tidak termasuk pembuatan Asset", mark: false},
            ]}></Item>
            <Item price="120.000" title="VR" features={[
                {label: "3 Ruangan", mark: true},
                {label: "Pengerjaan paling lambat 7 hari", mark: true},
                {label: "Tidak termasuk pembuatan Asset", mark: false},
            ]}></Item>
            <Item price="180.000" title="Puzzle" features={[
                {label: "2 Mode Game", mark: true},
                {label: "10 Level", mark: true},
                {label: "Pengerjaan paling lambat 7 hari", mark: true},
                {label: "Tidak termasuk pembuatan Asset", mark: false},
            ]}></Item>
        </div>
        <div className="flex flex-row not-lg:flex-col w-full lg:justify-evenly items-center not-lg:gap-10">
            <Item price="130.000" title="2D" features={[
                {label: "5 Level", mark: true},
                {label: "Pengerjaan paling lambat 7 hari", mark: true},
                {label: "Tidak termasuk pembuatan Asset", mark: false},
            ]}></Item>
            <Item price="150.000" title="3D" features={[
                {label: "3 Level", mark: true},
                {label: "Pengerjaan paling lambat 7 hari", mark: true},
                {label: "Tidak termasuk pembuatan Asset", mark: false},
            ]}></Item>
            <Item price="145.000" title="First Person" features={[
                {label: "3 Level", mark: true},
                {label: "Pengerjaan paling lambat 7 hari", mark: true},
                {label: "Tidak termasuk pembuatan Asset", mark: false},
            ]}></Item>
        </div>
    </div>
    </>
}

export default function LandingPage() {
    return <div className="flex flex-col w-full text-white">
        <HomePage />
        <ProductPage />
        <PricingPage />
    </div>
}