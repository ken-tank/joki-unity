export function ProjectCard({children, bodyClassName, className, title}: {
    children?: React.ReactNode,
    title?: string,
    bodyClassName?: string,
    className?: string,
}) {
    return <div className={"card overflow-y-hidden " + className}>
        <h2 className="border-b border-neutral-600 pb-3 font-bold">{title}</h2>
        <div className={"flex flex-col gap-2 overflow-y-auto h-full " + bodyClassName}>
            {children}
        </div>
    </div>
}

export function ItemValue({label, children}: {
    label: string, children?: React.ReactNode
}) {

    return <div className="flex flex-row not-lg:flex-col item">
        <h3 className="min-w-[150px]">{label}</h3>
        <div className="border-l pl-2 border-neutral-600">
            {children}
        </div>
    </div>
}