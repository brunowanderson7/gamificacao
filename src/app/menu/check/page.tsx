'use client'

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { FormEvent, useState } from "react"
import { api } from "@/lib/api"
import { AxiosError } from "axios"
import Link from 'next/link'
import { ModalCheck } from "@/components/ModalCheck"


export default function CheckGanhador() {

    const [data, setData] = useState<{ pName: string; date: string; hash: string }>({
        pName: 'Não encontrado',
        date: 'Não encontrado',
        hash: 'Hash invalido'
      });
    const [modal, setModal] = useState(false)

  async function handleSubmitRolette(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Evita o comportamento padrão de abrir uma nova página
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')


    const res = await api.post('/getwinner', {
        hash: name,
      }).then((res) => {
        if (res.status === 200) {
            setData(res.data.data)
            console.log(res.data.data)
        }
        
        setModal(true)
      }).catch((err: AxiosError) => {
        console.log(err.response)
        setModal(true)
      })
    }


  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Checar Ganhador</h1>
      </div>

      <form onSubmit={handleSubmitRolette} className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Input id="name" type="text" title="Hash" />
        <Button title="Confirmar" type="1" />
      </form>

      <div>
        {modal && (
            <ModalCheck
                pName={data?.pName ?? 'Não encontrado'}
                date={data?.date ?? 'Não encontrado'}
                hash={data?.hash ?? 'Hash invalido'}
                close={() => setModal(false)}
            />
        )}
      </div>

      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Link href="/menu"><Button title="Voltar" type="0" /></Link>
      </div>
    </div>
  )
}