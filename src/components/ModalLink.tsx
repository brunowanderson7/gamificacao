interface ModalLinkProps {
    url: string;
    close: () => void
}


export function ModalLink ({ url, close }: ModalLinkProps) {


    return (
        <div className="bg-white w-full h-full fixed z-50">
            <div className="flex flex-col items-center justify-center p-8">
                <h1 className="text-[22px]">{url}</h1>
                <button onClick={close} className='bg-green rounded-lg p-2 mt-4 mx-auto text-white'>Ok</button>
            </div>
        </div>
    )
}