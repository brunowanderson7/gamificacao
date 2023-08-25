interface SelectColorProps {
    id: string;
}

export function SelectColor({id }: SelectColorProps ) {

    const colors = [['/purple.png', 'Roxo'], ['/blue.png', 'azul'], ['/green.png', 'verde'], ['/yellow.png', 'amarelo'], ['/cyan.png', "ciano"], ['/red.png', 'vermelho'], ['/grey.png', 'cinza']]

    return (
        <>
            <h2 className="font-semibold">Cor do Balão</h2>
            <select className="border-cyan-600 border-2 h-12 text-[22px] rounded-md px-2 w-full bg-slate-100 text-black" name={id} id={id}>
                {colors.map((color, index) => (
                    <option  id={id} key={index} value={color[0]}>{color[1]}</option>
                ))}
            </select>
        </>
    )
}