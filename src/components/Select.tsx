interface InputProps {
    title: string;
    min?: number;
    max?: number;
}

export function Select({ title, min, max }: InputProps) {
    return (
        <div className="w-full">
            <h2 className="font-semibold">{title}</h2>
            <input type="number" min={min} max={max} className="border-cyan-600 border-2 h-12 text-[22px] rounded-md px-2 w-full bg-slate-100" />
        </div>
    )
}