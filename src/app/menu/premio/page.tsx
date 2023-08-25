'use client'

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"
import { api } from "@/lib/api"
import { FormEvent } from "react"
import Link from 'next/link'
import { AxiosError } from "axios"



export default function Premio() {

  const token = localStorage.getItem('token')
  if (token == null) {
    window.location.href = '/'
  }
  

  async function handleSubmitPremio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Evita o comportamento padrão de abrir uma nova página

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const amount = formData.get('amount')
    const info = formData.get('info')

    console.log(name, info, amount)

    const res = await api.post('/addpremio', {
      name: name,
      amount: Number(amount),
      info: info
    }).then((res) => {
      console.log(res)
      window.location.href = '/menu'
    }).catch((err: AxiosError) => {
      console.log(err.response)
    })

    console.log(res)
  }


  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Cadastro de Prêmio</h1>
      </div>

      <form onSubmit={handleSubmitPremio} className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Input id="name" type="text" title="Título" />
        <Input id="info" type="text" title="Informações" />
        <Select id="amount" min={1} max={99} title="Limite de Vencedores" />
        <Button title="Confirmar" type="1" />
      </form>
      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Link href="/menu"><Button title="Voltar" type="0" /></Link>
      </div>
    </div>
  )
} 