import { api } from '@/lib/api';
import html2canvas from 'html2canvas'
import { useRef } from 'react'



interface ModalProps {
    name: string;
    info: string;
    close: () => void;
    block: () => void;
}


export function OverlayModal ({name, info, close, block} : ModalProps) {

    const divRef = useRef(null)
    const zap = "89994417960"

    const exportAndShare = async () => {
        const divElement = divRef.current;

        try {
            await api.post('/winner', {
                name: name,
                code: hash,
                time: t
            }).then(() => {
                console.log("Vencedor salvo")
            })

            await api.post('/updatepremio', {
                name: name
            }).then(() => {
                console.log("Prêmio atualizado")
            })

            block()



        } catch (error) {
            console.error('Erro ao salvar vencedor', error);
        }

        if (divElement) {
            const canvas = await html2canvas(divElement);
            const imageDataURL = canvas.toDataURL('image/png');
        
            // Crie um link para abrir o WhatsApp com a imagem anexada
            const whatsappURL = `whatsapp://send?phone=${zap}&text=Hash%20${hash}&image=${encodeURIComponent(imageDataURL)}`;
        
            // Tente abrir o link no WhatsApp
            window.location.href = whatsappURL;
        }

        close()        
      };

      function time () {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        const time = `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`
        return time
      }
      const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const t = time()


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
                
                    <div className='text-sm mt-4 flex flex-col items-center justify-center'>
                        {
                            name !== 'Resgatado' && <p>Código: {hash}</p>
                        }
                        {
                            name !== 'Resgatado' && <p>{t}</p>
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