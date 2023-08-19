'use client'

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"
import { FormEvent } from "react"
import { api } from "@/lib/api"
import { AxiosError } from "axios"
import Link from 'next/link'

export default function Balao() {
    async function handleSubmitAdmin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault() // Evita o comportamento padrão de abrir uma nova página
    
        const formData = new FormData(event.currentTarget)
        const name = formData.get('name')
        const pass = formData.get('pass')
        const pass2 = formData.get('pass2')
        const limitUse = Number(formData.get('limitUse'))
    
        console.log(name, pass, pass2, limitUse)
    
        if (pass === pass2) {
            const res = await api.post('/adduser', {
                name: name,
                password: pass,
                limitUse: limitUse,
              }).then((res) => {
                console.log(res)
                window.location.href = '/menu'
              }).catch((err: AxiosError) => {
                console.log(err.response)
              })
            console.log(res)
        } else {
            console.log("Senhas não coincidem")
            alert("Senhas não coincidem")
        }
    
      }

    return (
        <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
            <div>
                {/* title */}
                <h1 className="text-center font-bold text-[38px] mb-8">Cadastrar Admin</h1>
            </div>

            <form onSubmit={handleSubmitAdmin} className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
                <Input id="name" type="text" title="Novo Usuário" />
                <Input id="pass" type="password" title="Senha" />
                <Input id="pass2" type="password" title="Confirmar Senha" />
                <Select id="limitUse" min={0} max={999} title="Limite de Criação" />
                <Button title="Confirmar" type="1" />

            </form>
            <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
                <Link href="/menu"><Button title="Voltar" type="0" /></Link>
            </div>
        </div>
    )
} 