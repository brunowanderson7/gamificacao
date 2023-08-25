interface Option {
    id: string,
    name: string,
    amount: number,
    info: string,
}

interface SelectPremioProps {
    id: string,
    options: Option[]
}


export function SelectPremio({id, options}: SelectPremioProps ) {

    return (
        <select className="border-cyan-600 border-2 h-12 text-[22px] rounded-md px-2 w-full bg-slate-100 text-black" name={id} id={id}>
            {options.map((option, index) => (
                <option  id={id} key={index} value={option.id}>{option.name}</option>
            ))}
        </select>
    )
}