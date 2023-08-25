import { color } from "framer-motion";

interface SelectColorProps {
    id: string;
    typ: number;
    title: string;
}

export function SelectColor({id, typ, title }: SelectColorProps ) {

    const colorsB = [['/purple.png', 'Roxo'], ['/blue.png', 'azul'], ['/green.png', 'verde'], ['/yellow.png', 'amarelo'], ['/cyan.png', "ciano"], ['/red.png', 'vermelho'], ['/grey.png', 'cinza']]
    const colorsBg = [['bg-purple', 'Roxo'], ['', 'azul'], ['bg-green', 'verde'], ['bg-pink', 'rosa'], ['bg-cyan', 'ciano'], ['bg-red', 'vermelho'], ['bg-black', 'preto'], ['bg-white', 'branco']]
    const colorsP = [['purple', 'Roxo'], ['blue', 'azul'], ['green', 'verde'], ['red', 'vermelho'], ['cyan', 'ciano'], ['yellow', 'amarelo'], ['grey', 'cinza'], ['black', 'preto'], ['white', 'branco'], ['orange', 'laranja']] 
    const colorT = [['black', 'preto'], ['white', 'branco']]

    function colorType () {
        if ( typ === 1){
            return colorsB
        } else if (typ === 2){
            return colorsBg
        } else if (typ === 3){
            return colorsP
        } else {
            return colorT
        }
    }

    const arrayColor = colorType()

    return (
        <>
            <h2 className="font-semibold">{title}</h2>
            <select className="border-cyan border-2 h-12 text-[22px] rounded-md px-2 w-full bg-slate-100 text-black" name={id} id={id}>
                {arrayColor.map((color, index) => (
                    <option  id={id} key={index} value={color[0]}>{color[1]}</option>
                ))}
            </select>
        </>
    )
}