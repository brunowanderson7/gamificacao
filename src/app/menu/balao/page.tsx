'use client'

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"
import { FormEvent } from "react"
import { api } from "@/lib/api"
import { AxiosError } from "axios"
import Link from 'next/link'
import { SelectColor } from "@/components/SelectColor"


export default function NovoBalao() {

  const token = localStorage.getItem('token')
  if (token == null) {
    window.location.href = '/'
  }
  

  function hashStr() {
    return Math.random().toString(36).substr(2, 10);
  }
  const hashname = hashStr()

  async function handleSubmitBalao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Evita o comportamento padrão de abrir uma nova página

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const subtitle = formData.get('subtitle')
    const amount = Number(formData.get('palete'))
    const limitUse = Number(formData.get('limit'))
    const pcolor = formData.get('pcolor')
    const scolor = formData.get('scolor')
    const bgcolor = formData.get('bgcolor')

    console.log(name, subtitle, amount, limitUse, pcolor, scolor, bgcolor)

    const res = await api.post('/addbalao', {
        name: hashname,
        title: name,
        subtitle: subtitle,
        amountSlice: amount,
        limitUse: limitUse,
        primaryColor: pcolor,
        secondaryColor: scolor,
        bgColor: bgcolor,
        premios: ''
      }).then((res) => {
        console.log(res)
        localStorage.setItem('nameB', hashname as string)
        localStorage.setItem('amountSliceB', amount as unknown as string)
        window.location.href = '/menu/balao/addpremio'
      }).catch((err: AxiosError) => {
        console.log(err.response)
      })
    console.log(res)
    }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Cadastro de Balão</h1>
      </div>

      <form onSubmit={handleSubmitBalao} className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Input id="name" type="text" title="Titulo" />
        <Input id="subtitle" type="text" title="Subtitulo" />
        <SelectColor id="pcolor" typ={1} title="Cor dos Balões"/>
        <SelectColor id="scolor" typ={2} title="Cor Secundaria"/>
        <SelectColor id="bgcolor" typ={2} title="Cor de Fundo"/>
        <Select id="palete" min={4} max={16} title="Numero de Balões" /> {/*  Apenas numeros pares */}
        <Select id="limit" min={1} max={99} title="Limite de Tentativas" />
        <Button title="Confirmar" type="1" />

      </form>
      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Link href="/menu"><Button title="Voltar" type="0" /></Link>
      </div>
    </div>
  )
} 