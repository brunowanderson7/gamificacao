'use client'

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { useState, FormEvent } from "react"
import Cookies from 'js-cookie'
import { api } from "@/lib/api"
import { AxiosError } from "axios"


export default () => {
  const [responseMessage, setResponseMessage] = useState('');


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Evita o comportamento padrão de abrir uma nova página

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const password = formData.get('password') 


    const res = await api.post('/login', {
      name: name,
      password: password
    })

    if (res.status === 200) {
      const { token } = res.data
      const cookiesExpiresInSeconds = 60 * 60 * 24 * 30 // 1 mês

      Cookies.set('token', token, {
        expires: cookiesExpiresInSeconds,
        path: '/',
      })

      window.location.href = '/menu'
    } else {
      setResponseMessage('Usuário ou senha incorretos')
    }


    
  }



  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Sistema de Games</h1>
      </div>

      <form onSubmit={handleSubmit} className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Input id="name" type="text" title="Usuário" />
        <Input id="password" type="password" title="Senha" />
        <Button title="Entrar" type="1" />
      </form> 
 
    </div>
  )
}