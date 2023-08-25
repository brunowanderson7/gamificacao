'use client'

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"
import { FormEvent } from "react"
import { api } from "@/lib/api"
import { AxiosError } from "axios"
import Link from 'next/link'


export default function NovaRoleta() {
  async function handleSubmitRolette(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Evita o comportamento padrão de abrir uma nova página

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const amount = Number(formData.get('palete'))
    const limitUse = Number(formData.get('limit'))
    const pcolor = formData.get('pcolor')
    const scolor = formData.get('scolor')
    // const bgcolor = formData.get('bgcolor')
    const tcolor = formData.get('tcolor')

    console.log(name, amount, limitUse, pcolor, scolor, tcolor)

    const res = await api.post('/addroulette', {
        name: name,
        amountSlice: amount,
        limitUse: limitUse,
        primaryColor: pcolor,
        secondaryColor: scolor,
        bgColor: '',
        textColor: tcolor,
        premios: ''
      }).then((res) => {
        console.log(res)
        localStorage.setItem('name', name as string)
        localStorage.setItem('amountSlice', amount as unknown as string)
        window.location.href = '/menu/roleta/addpremio'
      }).catch((err: AxiosError) => {
        console.log(err.response)
      })
    console.log(res)
    }


  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Cadastro de Roleta</h1>
      </div>

      <form onSubmit={handleSubmitRolette} className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Input id="name" type="text" title="Nome" />
        <Input id="pcolor" type="text" title="Cor Primaria" />
        <Input id="scolor" type="text" title="Cor Secundaria" />
        {/* <Input id="bgcolor" type="text" title="Cor de Fundo" /> */}
        <Input id="tcolor" type="text" title="Cor de Texto" />
        <Select id="palete" min={4} max={16} title="Numero de Paletas" /> {/*  Apenas numeros pares */}
        <Select id="limit" min={1} max={99} title="Limite de Tentativas" />
        <Button title="Confirmar" type="1" />

      </form>
      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Link href="/menu"><Button title="Voltar" type="0" /></Link>
      </div>
    </div>
  )
}