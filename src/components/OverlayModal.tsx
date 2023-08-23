import html2canvas from 'html2canvas'
import { useRef } from 'react'



interface ModalProps {
    name: string;
    info: string;
    close: () => void;
}


export function OverlayModal ({name, info, close} : ModalProps) {

    const divRef = useRef(null)

    const exportAndShare = async () => {
        const divElement = divRef.current;

        if (divElement) {
            const canvas = await html2canvas(divElement);
            const imageDataURL = canvas.toDataURL('image/png');

            // Crie um elemento de link para fazer o download da imagem
            const link = document.createElement('a');
            link.href = imageDataURL;
            link.download = 'imagem.png';
            link.click();
        }

        close()        
      };

      const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const time = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})


    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center'>
            <div className='bg-white flex flex-col items-center justify-center rounded-lg gap-2 p-2'>
                <div ref={divRef} className='bg-white rounded-lg p-6 text-2xl border-2 border-black flex flex-col justify-center items-center'>
                    {
                        name === 'Resgatado' ? <h1 className='text-3xl'>Que pena!!!</h1> : <h1 className='text-3xl font-bold'>{name}</h1>
                    }
                    {
                        name === 'Resgatado' ? <p>Esse prêmio já foi reivindicado!</p> : <p>{info}</p>
                    }
                
                    <div className='text-sm mt-4'>
                        {
                            name !== 'Resgatado' && <p>Código: {hash}</p>
                        }
                        {
                            name !== 'Resgatado' && <p>{time()}</p>
                        }
                    </div>
                </div>
                <div className='bg-white p-6 text-2xl flex justify-between gap-4 mt-4 items-center'>
                    {
                        name !== 'Resgatado' && <button onClick={exportAndShare} className='bg-green-500 rounded-lg p-2 mx-auto text-white'>Receber</button>
                    }
                    <button onClick={close} className='bg-red-500 rounded-lg p-2 mx-auto text-white'>Fechar</button>
                </div>
            
            </div>
        </div>
    )
}