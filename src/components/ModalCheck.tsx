interface ModalCheckProps {
    pName: string;
    hash: string;
    date: string;
    close: () => void
}

export function ModalCheck ({ pName, hash, date, close }: ModalCheckProps) {


    return (
        <div className="bg-white flex flex-col items-center justify-center p-8">
            {
                pName && <h1 className="text-[22px] font-semibold">Nome: {pName} <br/>Data: {date} <br/>Hash: {hash}</h1>
            }
             <button onClick={close} className='bg-red-500 rounded-lg p-2 mx-auto text-white'>Limpar</button>
        </div>
    )
}