'use client'

import { Button } from "@/components/Button"
import Link from 'next/link'
import { LinkButton } from "@/components/LinkButton"

export default function Balao() {
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <div>
        {/* title */}
        <h1 className="text-center font-bold text-[38px] mb-8">Sistema de Games</h1>
      </div>

      <div className="lg:w-1/4 md:w-1/3 w-2/3 flex flex-col gap-y-2">
        <Link href="/menu/cadastrar"><Button title="Cadastrar Usuário" type="1" /></Link>
        <Link href="/menu/premio"><Button title="Cadastrar Prêmio" type="1" /></Link>
        <Link href="/menu/roleta"><Button title="Criar Roleta" type="1" /></Link>
        <Link href="/menu/balao"><Button title="Criar Balão" type="1" /></Link>
        <Button title="Sair" type="0"  />

      </div>

    </div>
  )
} 