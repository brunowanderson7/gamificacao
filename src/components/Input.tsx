interface InputProps {
    title: string;
    type: string;
}

export function Input({ title, type }: InputProps) {
    return (
        <div className="w-full">
            <h2 className="font-semibold">{title}</h2>
            <input type={type} className="border-cyan-600 border-2 h-12 text-[22px] rounded-md px-2 w-full bg-slate-100" />
        </div>
    )
}